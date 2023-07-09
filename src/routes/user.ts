import { Router } from "express";
import { getUser, getUsers } from "../controllers";
import { verifyAccessToken } from "../middlewares";

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: The name of user
 *        email:
 *          type: string
 *          description: The email of user
 *        password:
 *          type: string
 *          description: The password of user
 */

export default (router: Router) => {
  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get a user by ID
   *     tags:
   *      - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Response success
   *       404:
   *         description: User not found
   */
  router.get("/api/users/:id", verifyAccessToken, getUser);

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: Get list of user
   *     tags:
   *      - Users
   *     parameters:
   *       - in: query
   *         name: role
   *         schema:
   *           type: string
   *           enum: [user, mentor]
   *     responses:
   *       200:
   *         description: Response success
   *       400:
   *         description: Invalid request body
   */
  router.post("/api/users", getUsers);

  // router.post("/auth/login-google", loginGoogle);
};
