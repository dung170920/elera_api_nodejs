import { SectionSchema } from "./../models/course";
import { Response } from "express";
import { IRequest } from "../shared";
import {
  addEnrollment,
  countEnrollments,
  getCourseById,
  getExistingEnrollment,
  getEnrollments,
  updateEnrollment,
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

    const existingEnroll = await getExistingEnrollment(req.user.id, course.id);

    if (existingEnroll) {
      return responseHandler(
        res,
        409,
        "User is already enrolled in this course"
      );
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

export const updateProgress = async (req: IRequest, res: Response) => {
  try {
    const { courseId, lessonId } = req.query;

    if (!isValidObjectId(courseId.toString())) {
      return responseHandler(res, 400);
    }

    const existingEnroll = await getExistingEnrollment(
      req.user.id,
      courseId.toString()
    );

    if (!existingEnroll) {
      return responseHandler(res, 404, "User is not enrolled in this course");
    }

    const course = await getCourseById(courseId.toString());

    const lesson = course.sections
      .flatMap((section: any) => section.lessons)
      .find((item) => item._id.toString() === lessonId);
    const lessonIndex = course.sections
      .flatMap((section: any) => section.lessons)
      .findIndex((item) => item._id.toString() === lessonId);

    if (!lesson) {
      return responseHandler(res, 404, "Lesson not found");
    }

    if (lessonIndex < Number(existingEnroll.nextLessonIndex)) {
      return responseHandler(res, 409, "Lesson is already viewed");
    }

    existingEnroll.progress =
      Number(existingEnroll.progress) +
      (lesson.duration / course.courseDuration) * 100;

    existingEnroll.nextLessonIndex = lessonIndex + 1;

    if (Number(existingEnroll.progress) > 100) {
      existingEnroll.progress = 100;
    }

    const updated = await updateEnrollment(existingEnroll._id, existingEnroll);

    return responseHandler(
      res,
      200,
      "Lesson progress updated successfully",
      updated
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
      return responseHandler(res, 200, "Get list of enrollment successfully", {
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

      return responseHandler(res, 200, "Get list of enrollment successfully", {
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
