import {
  addCourse,
  getCourseById,
  getCourses,
  editCourse,
  deleteCourse,
  countCourses,
} from "../models";
import { Response } from "express";
import { responseHandler, isValidObjectId } from "../utils";
import { IRequest } from "../shared";

export const getCourseList = async (req: IRequest, res: Response) => {
  try {
    const { pageNumber, pageSize, courseTypeId, isPopular } = req.query;

    // if (isPopular) {
    //   const popular = await getTopThreeCoursesByEnrollment(req.user.id);
    //   return responseHandler(res, 200, "Get list of course successfully", {
    //     data: popular,
    //     pageNumber: 1,
    //     pageSize: 3,
    //     totalPages: 1,
    //   });
    // }

    const parsePageNumber = Number(pageNumber) ?? 1;
    const parsePageSize = Number(pageSize) ?? 10;

    // if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
    //   return responseHandler(res, 400, "Invalid page number and page size");
    // }

    const count = await countCourses(courseTypeId?.toString());
    if (!count) {
      return responseHandler(res, 200, "Get list of course successfully", {
        data: [],
        pageNumber: parsePageNumber,
        pageSize: parsePageSize,
        totalPages: 0,
      });
    }

    const courses = await getCourses(
      parsePageNumber,
      parsePageSize,
      !!isPopular,
      courseTypeId?.toString(),
      req.user.id
    );

    return responseHandler(res, 200, "Get list of course successfully", {
      data: courses,
      pageNumber: parsePageNumber,
      pageSize: parsePageSize,
      totalPages: Math.ceil(count / parsePageSize),
    });
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const getCourse = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return responseHandler(res, 400);
    }

    const course = await getCourseById(id, req.user.id);

    if (course) {
      return responseHandler(res, 200, "Get course successfully", course);
    }
    return responseHandler(res, 404, "Course not found");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const createCourse = async (req: IRequest, res: Response) => {
  try {
    const { courseTypeId } = req.body;

    if (!isValidObjectId(courseTypeId)) {
      return responseHandler(res, 400);
    }

    const course = await addCourse({
      courseType: courseTypeId,
      mentor: req.user.id,
      ...req.body,
    });

    return responseHandler(
      res,
      201,
      "Course created successfully",
      course.toJSON()
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const updateCourse = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return responseHandler(res, 400);
    }

    const course = await getCourseById(id);

    if (!course) {
      return responseHandler(res, 404);
    }

    if (req.user.id !== course.mentor.id) {
      return responseHandler(res, 403);
    }

    const result = await editCourse(id, req.body);

    return responseHandler(
      res,
      200,
      "Course updated successfully",
      result.toJSON()
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const disableCourse = async (req: IRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return responseHandler(res, 400);
    }

    await deleteCourse(id);

    return responseHandler(res, 200, "Course disabled successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
