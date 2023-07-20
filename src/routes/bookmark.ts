import { Router } from "express";
import { verifyAccessToken } from "../middlewares";
import {
  addToBookMark,
  getBookMarkList,
  removeFromBookMark,
} from "../controllers";

export default (router: Router) => {
  router.post("/api/bookmark", verifyAccessToken, addToBookMark);

  router.delete("/api/bookmark", verifyAccessToken, removeFromBookMark);

  router.get("/api/bookmark", verifyAccessToken, getBookMarkList);
};
