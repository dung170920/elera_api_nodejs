import mongoose, { Schema, Document } from "mongoose";
import { formatToJson } from "../utils";

interface ICourseType extends Document {
  name: string;
  isDisable: boolean;
}

export const CourseTypeSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isDisable: { type: Boolean, default: false },
  },
  {
    toJSON: formatToJson,
  }
);

const CourseTypeModel = mongoose.model<ICourseType>(
  "CourseType",
  CourseTypeSchema
);

export const getCourseTypes = () => CourseTypeModel.find({ isDisable: false });

export const getCourseTypeById = (id: string) =>
  CourseTypeModel.findOne({ _id: id });

export const addCourseType = (values: Record<string, any>) =>
  new CourseTypeModel(values).save();

export const editCourseType = (id: string, values: Record<string, any>) =>
  CourseTypeModel.findByIdAndUpdate(id, values, {
    new: true,
  }).exec();

export const deleteCourseType = (id: string) =>
  CourseTypeModel.findByIdAndUpdate(id, { isDisable: false }, { new: true });
