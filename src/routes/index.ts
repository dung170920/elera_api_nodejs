import { Router } from "express";
import course_type from "./course_type";
import course from "./course";
import auth from "./auth";
import { loggerMiddleware } from "../middlewares";
import user from "./user";

const router = Router();

router.use((req, res, next) => loggerMiddleware(req, res, next));

export default (): Router => {
  course(router);
  course_type(router);
  auth(router);
  user(router);

  return router;
};
