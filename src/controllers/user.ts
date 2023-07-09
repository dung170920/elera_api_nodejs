import { Request, Response } from "express";
import { getUserById, getUserList } from "../models";
import mongoose from "mongoose";
import { responseHandler } from "../utils";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;

    const users = getUserList(role?.toString().toLowerCase());

    return responseHandler(res, 200, "Get list of user successfully", {
      data: users,
      // pageNumber: parsePageNumber,
      // pageSize: parsePageSize,
      // totalPages: Math.ceil(count / parsePageSize),
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await getUserById(id);
      if (user) {
        return responseHandler(res, 200, "Get user successfully", user);
      }
    }

    return responseHandler(res, 404, "User not found");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
