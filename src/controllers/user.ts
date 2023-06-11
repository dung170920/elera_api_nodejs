import { Request, Response } from "express";
import { getUserById } from "../models";
import mongoose from "mongoose";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await getUserById(id);
      if (user) {
        return res.status(200).json(user);
      }
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
