import {
  addCourseType,
  editCourseType,
  getCourseTypeById,
  getCourseTypes,
  deleteCourseType,
} from "../models";
import { Request, Response } from "express";

export const getCourseTypeList = async (req: Request, res: Response) => {
  try {
    const types = await getCourseTypes();

    return res.status(200).json({
      data: types,
    });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const getCourseType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const type = await getCourseTypeById(id);
    if (type) {
      return res.status(200).json({
        id: type._id,
        name: type.name,
      });
    }
    return res.status(404).json({ message: "Type not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCourseType = async (req: Request, res: Response) => {
  try {
    const type = await addCourseType(req.body);
    if (type) {
      return res.status(200);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCourseType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await editCourseType(id, req.body);

    return res.status(200).json({ message: "Type updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const disableCourseType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteCourseType(id);

    return res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
