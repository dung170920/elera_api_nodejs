import { Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { IRequest } from "../interfaces";
import { getUserById } from "../models";
import { responseHandler } from "../utils";
import "dotenv/config";

const accessTokenKey = process.env.JWT_ACCESS_TOKEN_KEY || "";
const refreshTokenKey = process.env.JWT_REFRESH_TOKEN_KEY || "";

export function signAccessToken(userId: string) {
  const payload = {};
  const options = {
    expiresIn: "1h",
    issuer: "elera.com",
    audience: userId,
  };
  return jwt.sign(payload, accessTokenKey, options);
}

export function signRefreshToken(userId: string) {
  return jwt.sign({}, refreshTokenKey, {
    expiresIn: "1y",
    audience: userId,
    issuer: "elera.com",
  });
}

export const verifyAccessToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req?.headers?.authorization?.split("Bearer ")[1] ?? "";

  if (token.length > 0) {
    jwt.verify(
      token,
      accessTokenKey,
      async (err: VerifyErrors, payload: JwtPayload) => {
        const user = await getUserById(payload.aud.toString());

        if (user) {
          req.user = user;
          next();
          return;
        }

        if (err) console.log(err.message);
      }
    );
  }
  responseHandler(res, 401);
};

export const verifyRefreshToken = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      refreshTokenKey,
      (err: VerifyErrors, payload: JwtPayload) => {
        if (err) return reject();
        const userId = payload.aud;
        //   client.GET(userId, (err, result) => {
        //     if (err) {
        //       console.log(err.message);
        //       reject(createError.InternalServerError());
        //       return;
        //     }
        //     if (refreshToken === result) return resolve(userId);
        //     reject(createError.Unauthorized());
        //   });
      }
    );
  });
};
