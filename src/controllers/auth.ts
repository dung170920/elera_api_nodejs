import { getUserByEmail } from "../db/models";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    //const expectedHash = a(user.authentication.salt, password);

    // if (user.authentication.password != password) {
    //   return res.sendStatus(403);
    // }

    // const salt = random();
    // user.authentication.sessionToken = authentication(
    //   salt,
    //   user._id.toString()
    // );

    await user.save();

    // res.cookie("ANTONIO-AUTH", user.authentication.sessionToken, {
    //   domain: "localhost",
    //   path: "/",
    // });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
