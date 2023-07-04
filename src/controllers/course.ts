import {
  addCourse,
  getCourseById,
  getCourses,
  editCourse,
  deleteCourse,
  ICourse,
  countCourses,
} from "../models";
import { Request, Response } from "express";
import { ErrorCode, errorHandler } from "../utils";

export const getCourseList = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.query;

    const parsePageNumber = Number(pageNumber);
    const parsePageSize = Number(pageSize);

    if (isNaN(parsePageNumber) || isNaN(parsePageSize)) {
      res.status(400).json({ error: "Invalid page number and page size" });
    }

    const totalCourses = await countCourses();
    const courses = await getCourses(parsePageNumber, parsePageSize);

    return res.status(200).json({
      data: courses,
      pageNumber: parsePageNumber,
      total: totalCourses,
      pageSize: parsePageSize,
    });
  } catch (error) {
    console.log(error);
    return errorHandler(res, ErrorCode.InternalServerError, error.message);
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);
    if (course) {
      return res.status(200).json(course);
    }
    return res.status(404).json({ message: "Course not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await addCourse(req.body);
    if (course) {
      return res.status(200).json(course);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await editCourse(id, req.body);

    return res.status(200).json({ message: "Course updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
