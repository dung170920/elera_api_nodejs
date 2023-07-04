import mongoose, { Schema, Document } from "mongoose";

interface ICourseType extends Document {
  name: string;
  isDisable: boolean;
}

const CourseTypeScheme: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isDisable: { type: Boolean, default: false },
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

const CourseTypeModel = mongoose.model<ICourseType>(
  "CourseType",
  CourseTypeScheme
);

export const getCourseTypes = () => CourseTypeModel.find({ isDisable: false });

export const getCourseTypeById = (id: string) =>
  CourseTypeModel.findOne({ _id: id });

export const addCourseType = (values: Record<string, any>) =>
  new CourseTypeModel(values).save().then((type) => type.toObject());

export const editCourseType = (id: string, values: Record<string, any>) =>
  CourseTypeModel.findByIdAndUpdate(id, values);

export const deleteCourseType = (id: string) =>
  CourseTypeModel.findByIdAndUpdate(id, { isDisable: true }, { new: true });
