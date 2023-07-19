import { Request } from "express";
import { Document, Types } from "mongoose";
import { SectionSchema } from "../models";
import { Role } from "./enums";

export interface ICourseType extends Document {
  name: string;
  isDisable: boolean;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  image: string;
  trailer: string;
  courseType: Types.ObjectId;
  mentor: Types.ObjectId;
  price: number;
  isDisable: boolean;
  rate: number;
  createAt: Date;
  sections: [typeof SectionSchema];
}

export interface IEnrollment extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  createAt: Date;
  progress: Number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isDisable: boolean;
  role: Role;
  googleId: string;
  createAt: Date;
}

export interface IRequest extends Request {
  user: IUser;
}
