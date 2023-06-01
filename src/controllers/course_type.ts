import { addCourseType, getCourseTypeById, getCourseTypes } from "../db/models";
import { Request, Response } from "express";

export const getCourseTypeList = async (req: Request, res: Response) => {
  try {
    const types = await getCourseTypes();
    return res.status(200).json(types);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getCourseType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const type = await getCourseTypeById(id);
    if (type) {
      return res.status(200).json(type);
    }
    return res.sendStatus(404).json({ message: "Type not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCourseType = async (req: Request, res: Response) => {
  try {
    const course = await addCourseType(req.body);
    if (course) {
      return res.status(200).json(course);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
