import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { IRequest, IToken } from "../interfaces";
import { getUserById } from "../models";

const key = process.env.JWT_SECRET_KEY || "";

export const authCheck = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.split("Bearer ")[1] ?? "";

    if (token.length > 0) {
      let decodedData = jwt.verify(token, key) as IToken;

      const user = await getUserById(decodedData?.id ?? "");

      if (user) {
        req.user = user;
      }
    }
    res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    console.log(error);
  }
};
