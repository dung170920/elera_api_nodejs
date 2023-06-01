import mongoose, { Schema, Document } from "mongoose";

interface ICourse extends Document {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
  type: mongoose.Types.ObjectId;
  price: number;
  isActive: boolean;
  // sections: Section[];
  // reviews: Review[];
}

const CourseScheme: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  trailerUrl: { type: String, required: false },
  price: { type: Number, required: true },
  //mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseType",
    required: true,
  },
  studentsCount: { type: Number, default: 0 },
  isDisable: { type: Boolean, default: false },
  // sections: [
  //   {
  //     title: { type: String, required: true },
  //     content: { type: String, required: true },
  //   },
  // ],
  // reviews: [
  //   {
  //     username: { type: String, required: true },
  //     rating: { type: Number, required: true },
  //     comment: { type: String, required: true },
  //   },
  // ],
  createAt: { type: Date, default: new Date() },
});

const CourseModel = mongoose.model<ICourse>("Course", CourseScheme);

export const getCourses = () => CourseModel.find().populate("type").exec();

export const getCourseById = (id: string) => CourseModel.findOne({ _id: id });

export const addCourse = (values: Record<string, any>) =>
  new CourseModel(values).save().then((course) => course.toObject());

export const updateCourse = (id: string, values: Record<string, any>) =>
  CourseModel.findByIdAndUpdate(id, values);

export const disableCourse = (id: string) =>
  CourseModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
