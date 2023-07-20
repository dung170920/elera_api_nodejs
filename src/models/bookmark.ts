import mongoose from "mongoose";
import { formatToJson } from "../utils";
import { IBookMark } from "../shared";

const BookMarkSchema = new mongoose.Schema(
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
  },
  {
    toJSON: formatToJson,
  }
);

const BookMarkModel = mongoose.model<IBookMark>("BookMark", BookMarkSchema);

export const getBookMarks = (
  pageNumber: number,
  pageSize: number,
  userId: string
) =>
  BookMarkModel.find({ user: userId })
    .sort({ _id: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

export const countBookMark = (userId: string) =>
  BookMarkModel.countDocuments({ user: userId });

export const addBookMark = (values: Record<string, any>) =>
  new BookMarkModel(values).save();

export const getExistingBookMark = (userId: string, courseId: string) =>
  BookMarkModel.findOne({
    user: userId,
    course: courseId,
  });

export const deleteBookMark = (userId: string, courseId: string) =>
  BookMarkModel.findByIdAndDelete(
    { user: userId, course: courseId },
    { new: true }
  );
