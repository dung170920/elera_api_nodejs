import { createUser, getUserByEmail } from "../models";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ErrorCode, errorHandler } from "../utils";

const key = process.env.JWT_SECRET_KEY || "";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorHandler(res, ErrorCode.BadRequest);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return errorHandler(res, ErrorCode.NotFound, "User doesn't exist");
    }

    const passwordCorrect = bcrypt.compare(password, user.password);

    if (!passwordCorrect)
      return errorHandler(res, ErrorCode.BadRequest, "Password is incorrect");

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name, avatar: user.avatar },
      key,
      { expiresIn: 60 * 60 }
    );

    return res.status(200).json({
      result: token,
    });
  } catch (error) {
    console.log(error);
    return errorHandler(res, ErrorCode.InternalServerError);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "User is already existed" });
    }

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Password and confirm password doesn't match" });

    bcrypt.hash(password, 12, async (err, hashPassword) => {
      if (err) {
        return res.status(501).json({ message: err.message });
      }
      const result = await createUser({
        email,
        password: hashPassword,
        name,
      });

      const token = jwt.sign(
        { email, id: result._id, name, avatar: result.avatar },
        key,
        {
          expiresIn: 60 * 60,
        }
      );

      return res.status(201).json({
        message: "Register successfully",
        result: token,
      });
    });
  } catch (error) {
    // return res.status(500).json({
    //   message: "Internal server error",
    // });
  }
};
