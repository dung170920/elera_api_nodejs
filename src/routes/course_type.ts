import {
  createCourseType,
  disableCourseType,
  getCourseTypeList,
  updateCourseType,
} from "../controllers";
import { Router } from "express";

export default (router: Router) => {
  router.get("/api/course-type", getCourseTypeList);

  // router.get("/api/course-types/:id", getCourseType);

  router.post("/api/course-type", createCourseType);

  router.patch("/api/course-type/:id", updateCourseType);

  router.delete("/api/course-type/:id", disableCourseType);
};
