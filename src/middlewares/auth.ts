import { Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { IRequest } from "../interfaces";
import { getUserById } from "../models";
import { getValue, responseHandler, setValue } from "../utils";
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

export async function signRefreshToken(userId: string) {
  try {
    const token = jwt.sign({}, refreshTokenKey, {
      expiresIn: "1y",
      audience: userId,
      issuer: "elera.com",
    });
    await setValue(userId, token, 365 * 24 * 60 * 60);
    return token;
  } catch (error) {
    throw error;
  }
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
        } else {
          return responseHandler(res, 401);
        }
      }
    );
  }
};

export const verifyRefreshToken = (
  refreshToken: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      refreshTokenKey,
      (err: VerifyErrors, payload: JwtPayload) => {
        if (err) return reject(err);
        const userId = payload.aud.toString();
        getValue(userId)
          .then((result) => {
            if (refreshToken === result) {
              return resolve(userId);
            }
          })
          .catch((err) => {
            return reject(err);
          });
      }
    );
  });
};
