import { createUser, getUserByEmail } from "../db/models";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const key = process.env.JWT_SECRET_KEY || "";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const passwordCorrect = bcrypt.compare(password, user.password);

    if (!passwordCorrect)
      return res.status(400).json({ message: "Email or password incorrect!" });

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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await createUser({
      email,
      password: hashPassword,
      name,
    });

    const token = jwt.sign({ email, id: result._id, name }, key, {
      expiresIn: 60 * 60,
    });

    return res
      .status(200)
      .json({
        result: token,
      })
      .end();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
