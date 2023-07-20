import {
  createCourseType,
  disableCourseType,
  getCourseTypeList,
  updateCourseType,
} from "../controllers";
import { Router } from "express";
import { verifyAccessToken } from "../middlewares";

export default (router: Router) => {
  router.get("/api/course-type", verifyAccessToken, getCourseTypeList);

  // router.get("/api/course-types/:id", getCourseType);

  router.post("/api/course-type", verifyAccessToken, createCourseType);

  router.patch("/api/course-type/:id", verifyAccessToken, updateCourseType);

  router.delete("/api/course-type/:id", verifyAccessToken, disableCourseType);
};
