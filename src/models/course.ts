import mongoose, { Schema, Document } from "mongoose";
import { currentDate, formatToJson } from "../utils";

export interface ICourse extends Document {
  title: string;
  description: string;
  image: string;
  trailer: string;
  courseType: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  price: number;
  isDisable: boolean;
  rate: number;
  createAt: Date;
  sections: [typeof SectionSchema];
}

const LessonSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: formatToJson,
  }
);

const SectionSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lessons: [LessonSchema],
  },
  {
    toJSON: formatToJson,
  }
);

const CourseSchema: Schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    trailer: { type: String, required: false },
    price: { type: Number, required: true },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseType",
      required: true,
    },
    rate: { type: Number, default: 0 },
    isDisable: { type: Boolean, default: false },
    createAt: {
      type: Date,
      default: currentDate(),
    },
    sections: [SectionSchema],
  },
  {
    toJSON: formatToJson,
  }
);

CourseSchema.virtual("studentsCount", {
  ref: "Enrollment",
  localField: "_id",
  foreignField: "course",
  count: true,
});

SectionSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  if (this.lessons && this.lessons.length) {
    for (const lesson of this.lessons) {
      totalDuration += lesson.duration;
    }
  }

  return totalDuration;
});

SectionSchema.virtual("totalLesson").get(function () {
  return this.lessons.length;
});

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

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
    .populate("studentsCount")
    .select("-sections -reviewsCount -mentor")
    .exec();

export const countCourses = (courseTypeId?: string) =>
  CourseModel.countDocuments(
    courseTypeId
      ? { isDisable: false, courseType: courseTypeId }
      : { isDisable: false }
  );

export const getTopThreeCoursesByEnrollment = () =>
  CourseModel.aggregate([
    {
      $sort: { studentsCount: -1 },
    },
    {
      $limit: 3,
    },
  ]);

export const getCourseById = (id: string) =>
  CourseModel.findOne({ _id: id })
    .populate("courseType")
    .populate("mentor", "-password -role")
    .populate("studentsCount");

export const addCourse = (values: Record<string, any>) =>
  new CourseModel(values).save();

export const editCourse = (id: string, values: Record<string, any>) =>
  CourseModel.findByIdAndUpdate(id, values, {
    new: true,
  }).exec();

export const deleteCourse = (id: string) =>
  CourseModel.findByIdAndUpdate(id, { isDisable: false }, { new: true });
