import { addCourse, getCourseById, getCourses } from "../db/models";
import { Request, Response } from "express";

export const getCourseList = async (req: Request, res: Response) => {
  try {
    const courses = await getCourses();
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await getCourseById(id);
    if (course) {
      return res.status(200).json(course);
    }
    return res.sendStatus(404).json({ message: "Course not found" });
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
