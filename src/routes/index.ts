import express from "express";
import course from "./course";
import course_type from "./course_type";

const router = express.Router();

export default (): express.Router => {
  course(router);
  course_type(router);
  // auth(router);

  return router;
};
