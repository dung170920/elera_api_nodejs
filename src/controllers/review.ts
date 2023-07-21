import { Response } from "express";
import { isValidObjectId, responseHandler } from "../utils";
import {
  addReview,
  getCourseById,
  getReviewById,
  editCourse,
  getExistingReview,
  getExistingEnrollment,
} from "../models";
import { EnrollmentStatus, IRequest } from "../shared";

export const addCourseReview = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;

    if (!isValidObjectId(courseId)) {
      return responseHandler(res, 400);
    }

    const course = await getCourseById(courseId);

    if (!course) {
      return responseHandler(res, 404, "Course not found");
    }

    const enrollment = await getExistingEnrollment(req.user.id, courseId);

    if (!enrollment || enrollment.status === EnrollmentStatus.ongoing) {
      return responseHandler(res, 400, "Course not completed");
    }

    if (await getExistingReview(req.user.id, courseId)) {
      return responseHandler(res, 409, "You have already reviewed this course");
    }

    const review = await addReview({
      user: req.user.id,
      course: courseId,
      rating,
      comment,
    });

    course.reviews.push(review._id);

    let totalRating = 0;
    for (const reviewId of course.reviews) {
      const review = await getReviewById(reviewId.toString());
      totalRating += Number(review ? review.rating : 0);
    }

    course.rating = totalRating / course.reviews.length;

    await editCourse(courseId, course);

    return responseHandler(
      res,
      200,
      "Review added successfully",
      review.toJSON()
    );
  } catch (error) {
    return responseHandler(res, 500, error.message);
  }
};
