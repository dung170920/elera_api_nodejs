import { Router } from "express";
import { verifyAccessToken } from "../middlewares";
import {
  addToBookMark,
  getBookMarkList,
  removeFromBookMark,
} from "../controllers";

export default (router: Router) => {
  router.post("/api/bookmark/:courseId", verifyAccessToken, addToBookMark);

  router.delete(
    "/api/bookmark/:courseId",
    verifyAccessToken,
    removeFromBookMark
  );

  router.get("/api/bookmark", verifyAccessToken, getBookMarkList);
};
