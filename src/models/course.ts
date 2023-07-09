import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
  courseType: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  price: number;
  isDisable: boolean;
  studentsCount: number;
  reviewsCount: number;
  rate: number;
  createAt: Date;
}

const CourseScheme: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    trailerUrl: { type: String, required: false },
    price: { type: Number, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseType",
      required: true,
    },
    studentsCount: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    isDisable: { type: Boolean, default: false },
    createAt: { type: Date, default: new Date() },
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

const CourseModel = mongoose.model<ICourse>("Course", CourseScheme);

export const getCourses = (
  pageNumber: number,
  pageSize: number,
  courseTypeId?: string
) =>
  CourseModel.find(
    courseTypeId
      ? { isDisable: false, courseType: courseTypeId }
      : { isDisable: false }
  )
    .sort({ _id: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("courseType")
    .populate("mentor", "-password -role")
    .exec();

export const countCourses = () => CourseModel.countDocuments();

export const getCourseById = (id: string) =>
  CourseModel.findOne({ _id: id })
    .populate("courseType")
    .populate("mentor", "-password -role");

export const addCourse = (values: Record<string, any>) =>
  new CourseModel(values).save().then((course) => course.toObject());

export const editCourse = (id: string, values: Record<string, any>) =>
  CourseModel.findByIdAndUpdate(id, values);

export const deleteCourse = (id: string) =>
  CourseModel.findByIdAndUpdate(id, { isDisable: false }, { new: true });
