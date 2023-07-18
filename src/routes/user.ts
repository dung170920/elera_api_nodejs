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

  router.get("/api/user", getUsers);

  router.post("/api/user/register", register);

  router.post("/api/user/login", login);

  router.post("/api/user/logout", verifyAccessToken, logout);

  router.post("/api/user/refresh-token", getNewToken);

  /**
   * @swagger
   * /api/user/google-login:
   *   post:
   *     summary: Login account with google
   *     tags:
   *      - User
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserGoogleLoginRequest'
   *     responses:
   *       200:
   *        description: "Success"
   *        content:
   *          text/plain:
   *            schema:
   *              $ref: "#/components/schemas/APIResponse"
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/APIResponse"
   *          text/json:
   *            schema:
   *              $ref: "#/components/schemas/APIResponse"
   */
  router.post("/api/user/google-login", googleLogin);
  router.get("/api/user/google-login");
};
