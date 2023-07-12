import { Response } from "express";
import { IRequest } from "../interfaces";
import { EnrollmentModel, getCourseById, getUserById } from "../models";
import { responseHandler } from "../utils";

export const enrollCourse = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    const course = await getCourseById(courseId);
    if (!course) {
      return responseHandler(res, 404, "Course not found");
    }

    const existingEnroll = await EnrollmentModel.findOne({
      user: req.user.id,
      course: course.id,
    });

    if (existingEnroll) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course" });
    }

    const enroll = new EnrollmentModel({
      user: req.user.id,
      course: course.id,
    });
    await enroll.save();

    return responseHandler(res, 200, "Enroll in course successfully", enroll);
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getEnrollments = async (req: IRequest, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.query;

    const parsePageNumber = Number(pageNumber);
    const parsePageSize = Number(pageSize);

    if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
      return responseHandler(res, 400, "Invalid page number and page size");
    }

    const count = await EnrollmentModel.countDocuments({ user: req.user.id });
    if (!count) {
      return responseHandler(res, 200, "Get list of course successfully", {
        data: [],
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: 0,
      });
    } else {
      const enrollments = await EnrollmentModel.find({ user: req.user.id })
        .sort({ _id: -1 })
        .skip((parsePageNumber - 1) * parsePageSize)
        .limit(parsePageSize)
        .exec();

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
