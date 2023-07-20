import { Router } from "express";
import {
  getNewToken,
  getUser,
  getUsers,
  googleLogin,
  login,
  logout,
  register,
} from "../controllers";
import { verifyAccessToken } from "../middlewares";

export default (router: Router) => {
  router.get("/api/user/:id", verifyAccessToken, getUser);

  router.get("/api/user", verifyAccessToken, getUsers);

  router.post("/api/user/register", register);

  router.post("/api/user/login", login);

  router.post("/api/user/logout", verifyAccessToken, logout);

  router.post("/api/user/refresh-token", getNewToken);

  router.post("/api/user/google-login", googleLogin);
  //router.get("/api/user/google-login");
};
