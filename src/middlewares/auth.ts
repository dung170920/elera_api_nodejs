import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { IUser, getUserById } from "../models";
import { getValue, responseHandler, setValue } from "../utils";
import "dotenv/config";

export interface IRequest extends Request {
  user: IUser;
}

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

export const verifyAccessToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1] ?? "";

    const payload = jwt.verify(token, accessTokenKey) as JwtPayload;
    console.log("payload :", payload);

    if (payload) {
      const user = await getUserById(payload.aud.toString());
      if (user) {
        req.user = user.toJSON();
        next();
      } else {
        return responseHandler(res, 401);
      }
    }
  } catch (error) {
    return responseHandler(res, 401);
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
