import mongoose, { Schema, Document } from "mongoose";
import { currentDate } from "../utils";

export interface IEnrollment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  createAt: Date;
}

const EnrollmentScheme: Schema = new mongoose.Schema(
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
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

export const EnrollmentModel = mongoose.model<IEnrollment>(
  "Enrollment",
  EnrollmentScheme
);
