import { Response } from "express";
import { IRequest } from "../shared";
import { isValidObjectId, responseHandler } from "../utils";
import {
  addBookMark,
  countBookMark,
  deleteBookMark,
  getBookMarks,
  getCourseById,
  getExistingBookMark,
} from "../models";

export const addToBookMark = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    if (!isValidObjectId(courseId)) {
      return responseHandler(res, 400);
    }

    const course = await getCourseById(courseId);
    if (!course) {
      return responseHandler(res, 404, "Course not found");
    }

    const existing = await getExistingBookMark(req.user.id, courseId);
    if (existing) {
      return responseHandler(res, 409, "Course is already added to bookmark");
    }

    const bookmark = await addBookMark({
      user: req.user.id,
      course: courseId,
    });

    return responseHandler(
      res,
      200,
      "Course added to bookmark successfully",
      bookmark.toJSON()
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getBookMarkList = async (req: IRequest, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.query;

    const parsePageNumber = Number(pageNumber);
    const parsePageSize = Number(pageSize);

    if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
      return responseHandler(res, 400, "Invalid page number and page size");
    }

    const count = await countBookMark(req.user.id);
    if (!count) {
      return responseHandler(res, 200, "Get list of bookmark successfully", {
        data: [],
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: 0,
      });
    } else {
      const enrollments = await getBookMarks(
        parsePageNumber,
        parsePageSize,
        req.user.id
      );

      return responseHandler(res, 200, "Get list of bookmark successfully", {
        data: enrollments,
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: Math.ceil(count / parsePageSize),
      });
    }
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const removeFromBookMark = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    if (!isValidObjectId(courseId)) {
      return responseHandler(res, 400);
    }

    const deleted = await deleteBookMark(req.user.id, courseId);

    if (!deleted) {
      return responseHandler(res, 404, "Course not found in bookmark");
    }

    return responseHandler(
      res,
      200,
      "Course removed from bookmark successfully"
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
