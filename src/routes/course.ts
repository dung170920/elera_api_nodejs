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
  // router.use(verifyAccessToken);

  router.get("/api/course", verifyAccessToken, getCourseList);

  router.get("/api/course/:id", verifyAccessToken, getCourse);

  router.post("/api/course", verifyAccessToken, createCourse);

  router.patch("/api/course/:id", verifyAccessToken, updateCourse);

  router.delete("/api/course/:id", verifyAccessToken, disableCourse);
};
