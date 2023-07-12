import { Router } from "express";
import course_type from "./course_type";
import course from "./course";
import auth from "./auth";
import user from "./user";
import enrollment from "./enrollment";

const router = Router();

export default (): Router => {
  course(router);
  course_type(router);
  auth(router);
  user(router);
  enrollment(router);

  return router;
};
