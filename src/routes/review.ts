import { Router } from "express";
import { verifyAccessToken } from "../middlewares";
import { addCourseReview } from "../controllers";

export default (router: Router) => {
  router.post("/api/review/:courseId", verifyAccessToken, addCourseReview);
};
