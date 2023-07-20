import mongoose, { Schema, Document } from "mongoose";
import { currentDate, formatToJson } from "../utils";
import { IEnrollment } from "../shared";

const EnrollmentSchema: Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    createAt: {
      type: Date,
      default: currentDate(),
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: formatToJson,
  }
);

const EnrollmentModel = mongoose.model<IEnrollment>(
  "Enrollment",
  EnrollmentSchema
);

export const getEnrollments = (
  pageNumber: number,
  pageSize: number,
  userId: string
) =>
  EnrollmentModel.find({ user: userId })
    .sort({ _id: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

export const countEnrollments = (userId: string) =>
  EnrollmentModel.countDocuments({ user: userId });

export const getExistingEnrollment = (userId: string, courseId: string) =>
  EnrollmentModel.findOne({
    user: userId,
    course: courseId,
  });

export const addEnrollment = (values: Record<string, any>) =>
  new EnrollmentModel(values).save();
