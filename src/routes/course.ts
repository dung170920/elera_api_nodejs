import { createCourse, getCourse, getCourseList } from "../controllers";
import { Router } from "express";

export default (router: Router) => {
  router.get("/courses", getCourseList);
  router.get("/courses/:id", getCourse);
  router.post("/courses", createCourse);
};
