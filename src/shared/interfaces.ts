import { Request } from "express";
import { Document, Types } from "mongoose";
import { SectionSchema } from "../models";
import { EnrollmentStatus, Role } from "./enums";

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
  rating: number;
  createAt: Date;
  courseDuration: number;
  sections: [typeof SectionSchema];
  isBookmarked: boolean;
}

export interface IEnrollment extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  createAt: Date;
  progress: number;
  nextLessonIndex: number;
  status: EnrollmentStatus;
}

export interface IBookMark extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
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

export interface IReview extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  createAt: Date;
  rating: number;
  comment: string;
}
