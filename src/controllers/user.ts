import { Request, Response } from "express";
import { countUsers, getCourseById, getUserById, getUserList } from "../models";
import mongoose from "mongoose";
import { responseHandler } from "../utils";
import { IRequest } from "../interfaces";

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

export const saveCourse = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    const course = await getCourseById(courseId);
    if (!course) {
      return responseHandler(res, 404, "Course not found");
    }

    const user = await getUserById(req.user.id);
    if (user.enrolledCourses.includes(courseId)) {
      return responseHandler(res, 400, "Course is enrolled");
    }

    //await enroll(courseId, user.id);

    return responseHandler(res, 200, "Enroll in course successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
