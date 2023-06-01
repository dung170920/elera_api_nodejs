import {
  createCourseType,
  getCourseType,
  getCourseTypeList,
} from "../controllers";
import { Router } from "express";

export default (router: Router) => {
  router.get("/course-types", getCourseTypeList);
  router.get("/course-types/:id", getCourseType);
  router.post("/course-types", createCourseType);
};
