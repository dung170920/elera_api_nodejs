import { Router } from "express";
import course_type from "./course_type";
import course from "./course";
import user from "./user";
import enrollment from "./enrollment";
import review from "./review";

const router = Router();

export default (): Router => {
  course(router);
  course_type(router);
  user(router);
  enrollment(router);
  review(router);

  return router;
};
