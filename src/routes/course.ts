import {
  createCourse,
  disableCourse,
  getCourse,
  getCourseList,
  updateCourse,
} from "../controllers";
import { Router } from "express";
import { verifyAccessToken } from "../middlewares";

export default (router: Router) => {
  router.get("/api/course", getCourseList);

  router.get("/api/course/:id", getCourse);

  router.post("/api/course", verifyAccessToken, createCourse);

  router.patch("/api/course/:id", updateCourse);

  router.delete("/api/course/:id", disableCourse);
};
