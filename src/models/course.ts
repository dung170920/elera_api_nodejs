import mongoose, { Schema } from "mongoose";
import { currentDate, formatToJson } from "../utils";
import { ICourse } from "../shared";
import { getExistingBookMark } from ".";

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

export const SectionSchema: Schema = new mongoose.Schema(
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseType: {
      type: Schema.Types.ObjectId,
      ref: "CourseType",
      required: true,
    },
    rating: { type: Number, default: 0 },
    isDisable: { type: Boolean, default: false },
    createAt: {
      type: Date,
      default: currentDate(),
    },
    sections: [SectionSchema],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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

CourseSchema.virtual("isBookmarked", {
  ref: "BookMark",
  localField: "_id",
  foreignField: "course",
}).get(function () {
  console.log(this.options?.userId);

  if (!this.options?.userId) return false;
  return getExistingBookMark(this.options.userId, this.id).then(
    (bookmark) => !!bookmark
  );
});

SectionSchema.virtual("sectionDuration").get(function () {
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

CourseSchema.virtual("courseDuration").get(function () {
  let totalDuration = 0;
  if (this.sections && this.sections.length) {
    for (const sections of this.sections) {
      totalDuration += sections.sectionDuration;
    }
  }

  return totalDuration;
});

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

export const getCourses = (
  pageNumber: number,
  pageSize: number,
  courseTypeId?: string,
  userId?: string
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
    .select("-sections -mentor - courseDuration")
    .populate("studentsCount")
    .populate({
      path: "isBookmarked",
      options: {
        userId,
      },
    });

export const countCourses = (courseTypeId?: string) =>
  CourseModel.countDocuments(
    courseTypeId
      ? { isDisable: false, courseType: courseTypeId }
      : { isDisable: false }
  );

export const getTopThreeCoursesByEnrollment = (userId?: string) =>
  CourseModel.find()
    .sort({ studentsCount: -1 })
    .limit(3)
    .populate("courseType")
    .select("-sections -mentor")
    .populate("studentsCount")
    .populate({
      path: "isBookmarked",
      options: {
        userId,
      },
    });

export const getCourseById = (id: string, userId?: string) =>
  CourseModel.findOne({ _id: id })
    .populate("courseType")
    .populate("mentor", "-password -role")
    .populate("studentsCount")
    .populate({
      path: "isBookmarked",
      options: {
        userId,
      },
    });

export const addCourse = (values: Record<string, any>) =>
  new CourseModel(values).save();

export const editCourse = (id: string, values: Record<string, any>) =>
  CourseModel.findByIdAndUpdate(id, values, {
    new: true,
  }).exec();

export const deleteCourse = (id: string) =>
  CourseModel.findByIdAndUpdate(id, { isDisable: false }, { new: true });
