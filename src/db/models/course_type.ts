import mongoose, { Schema, Document } from "mongoose";

interface ICourseType extends Document {
  name: string;
}

const CourseTypeScheme: Schema = new mongoose.Schema({
  name: { type: String, required: true },
});

const CourseTypeModel = mongoose.model<ICourseType>(
  "CourseType",
  CourseTypeScheme
);

export const getCourseTypes = () => CourseTypeModel.find();

export const getCourseTypeById = (id: string) =>
  CourseTypeModel.findOne({ _id: id });

export const addCourseType = (values: Record<string, any>) =>
  new CourseTypeModel(values).save().then((type) => type.toObject());

export const updateCourseType = (id: string, values: Record<string, any>) =>
  CourseTypeModel.findByIdAndUpdate(id, values);

export const disableCourseType = (id: string) =>
  CourseTypeModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
