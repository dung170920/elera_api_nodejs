import { Router } from "express";
import { verifyAccessToken } from "../middlewares";
import { enrollCourse, getEnrollmentList } from "../controllers";

export default (router: Router) => {
  router.post("/api/enrollment", verifyAccessToken, enrollCourse);

  router.get("/api/enrollment", verifyAccessToken, getEnrollmentList);
};
