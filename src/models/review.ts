import mongoose, { Schema } from "mongoose";
import { currentDate, formatToJson } from "../utils";
import { IReview } from "../shared";

const ReviewSchema: Schema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    createAt: {
      type: Date,
      default: currentDate(),
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: formatToJson,
  }
);

const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema);

export const addReview = (values: Record<string, any>) =>
  new ReviewModel(values).save();

export const getReviewById = (id: string) => ReviewModel.findOne({ _id: id });

export const getExistingReview = (userId: string, courseId: string) =>
  ReviewModel.findOne({
    user: userId,
    course: courseId,
  });
