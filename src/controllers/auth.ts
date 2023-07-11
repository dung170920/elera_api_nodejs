import { responseHandler } from "../utils";
import { createUser, getUserByEmail } from "../models";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../middlewares";
import { loginValidation, registerValidation } from "../validation";

export const login = async (req: Request, res: Response) => {
  try {
    const { value, error } = loginValidation.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      return responseHandler(res, 400, message);
    }

    const user = await getUserByEmail(value.email);

    if (!user) {
      return responseHandler(res, 404, "User doesn't exist");
    }

    const passwordCorrect = bcrypt.compare(value.password, user.password);

    if (!passwordCorrect) {
      return responseHandler(res, 400, "Password is incorrect");
    }

    const accessToken = signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    return responseHandler(res, 200, "Login successfully", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { value, error } = registerValidation.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      return responseHandler(res, 400, message);
    }

    const user = await getUserByEmail(value.email);

    if (user) {
      return responseHandler(res, 409, "User is already existed");
    }

    bcrypt.hash(value.password, 12, async (error, hashPassword) => {
      const result = await createUser({
        email: value.email,
        password: hashPassword,
        name: value.name,
      });

      const accessToken = signAccessToken(result.id);
      const refreshToken = await signRefreshToken(result.id);

      return responseHandler(res, 200, "Register successfully", {
        accessToken,
        refreshToken,
      });
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getNewToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return responseHandler(res, 400, "Invalid request token");
    }

    const userId = await verifyRefreshToken(refreshToken);

    if (!userId) {
      return responseHandler(res, 401);
    }
    const accessToken = signAccessToken(userId ?? "");

    return responseHandler(res, 200, "Refresh token successfully", {
      accessToken,
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
