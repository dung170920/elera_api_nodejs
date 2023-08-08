import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import {
  countUsers,
  createUser,
  getUserByEmail,
  getUserByGoogleId,
  getUserById,
  getUserList,
} from "../models";
import mongoose from "mongoose";
import {
  delKey,
  responseHandler,
  loginValidation,
  registerValidation,
  isValidObjectId,
} from "../utils";
import { IRequest } from "../shared";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../middlewares";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config";

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

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { idToken } = req.body;

    if (!idToken) {
      return responseHandler(res, 401);
    }

    const decoded = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = decoded.getPayload();
    const user = await getUserByGoogleId(payload.sub);

    if (!user) {
      const result = await createUser({
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        googleId: payload.sub,
      });

      
      const accessToken = signAccessToken(result._id);
      const refreshToken = await signRefreshToken(result._id);

      return responseHandler(res, 200, "Login with google successfully", {
        accessToken,
        refreshToken,
      });
    } else {
      const accessToken = signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      return responseHandler(res, 200, "Login with google successfully", {
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
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

      const accessToken = signAccessToken(result._id);
      const refreshToken = await signRefreshToken(result._id);

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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize, role } = req.query;

    const parsePageNumber = Number(pageNumber);
    const parsePageSize = Number(pageSize);

    if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
      return responseHandler(res, 400, "Invalid page number and page size");
    }

    const count = await countUsers(role?.toString().toLowerCase());
    if (!count) {
      return responseHandler(res, 200, "Get list of user successfully", {
        data: [],
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: 0,
      });
    }

    const users = await getUserList(
      parsePageNumber,
      parsePageSize,
      role?.toString().toLowerCase()
    );

    return responseHandler(res, 200, "Get list of user successfully", {
      data: users,
      pageNumber: parsePageNumber,
      pageSize: parsePageSize,
      totalPages: Math.ceil(count / parsePageSize),
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return responseHandler(res, 400);
    }

    const user = await getUserById(id);

    if (user) {
      return responseHandler(res, 200, "Get user successfully", user);
    }

    return responseHandler(res, 404, "User not found");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const logout = async (req: IRequest, res: Response) => {
  try {
    await delKey(req.user.id);
    return responseHandler(res, 200, "Logout successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
