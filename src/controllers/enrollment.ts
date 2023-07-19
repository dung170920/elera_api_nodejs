import { Response } from "express";
import { IRequest } from "../shared";
import {
  addEnrollment,
  countEnrollments,
  getCourseById,
  getEnrollment,
  getEnrollments,
} from "../models";
import { responseHandler, isValidObjectId } from "../utils";

export const enrollCourse = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    if (!isValidObjectId(courseId)) {
      return responseHandler(res, 400);
    }

    const course = await getCourseById(courseId);
    if (!course) {
      return responseHandler(res, 404, "Course not found");
    }

    const existingEnroll = await getEnrollment(req.user.id, course.id);

    if (existingEnroll) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course" });
    }

    const enroll = await addEnrollment({
      user: req.user.id,
      course: course.id,
    });

    return responseHandler(
      res,
      200,
      "Enroll in course successfully",
      enroll.toJSON()
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getEnrollmentList = async (req: IRequest, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.query;

    const parsePageNumber = Number(pageNumber);
    const parsePageSize = Number(pageSize);

    if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
      return responseHandler(res, 400, "Invalid page number and page size");
    }

    const count = await countEnrollments(req.user.id);
    if (!count) {
      return responseHandler(res, 200, "Get list of course successfully", {
        data: [],
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: 0,
      });
    } else {
      const enrollments = await getEnrollments(
        parsePageNumber,
        parsePageSize,
        req.user.id
      );

      return responseHandler(res, 200, "Get list of course successfully", {
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
