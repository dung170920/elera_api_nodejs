import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequest, IToken } from "../interfaces";
import { getUserById } from "../models";

const key = process.env.JWT_SECRET_KEY || "";

const auth = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1] ?? "";

    let decodedData = jwt.verify(token, key) as IToken;

    const user = await getUserById(decodedData?.id ?? "");

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default auth;
