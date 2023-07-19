import {
  addCourseType,
  editCourseType,
  getCourseTypes,
  deleteCourseType,
} from "../models";
import { Request, Response } from "express";
import { responseHandler, createCourseTypeValidation } from "../utils";

export const getCourseTypeList = async (req: Request, res: Response) => {
  try {
    const types = await getCourseTypes();

    return responseHandler(
      res,
      200,
      "Get list of course type successfully",
      types
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

// export const getCourseType = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const type = await getCourseTypeById(id);
//     if (type) {
//       return res.status(200).json({
//         id: type._id,
//         name: type.name,
//       });
//     }
//     return res.status(404).json({ message: "Type not found" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const createCourseType = async (req: Request, res: Response) => {
  try {
    const { value, error } = createCourseTypeValidation.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      return responseHandler(res, 400, message);
    }
    await addCourseType(value.name);
    return responseHandler(res, 201, "Course type created successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};

export const updateCourseType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await editCourseType(id, req.body);

    return responseHandler(res, 200, "Course type updated successfully");
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, error.message);
  }
};

export const disableCourseType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteCourseType(id);

    return responseHandler(res, 200, "Course type disabled successfully");
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
