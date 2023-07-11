import { Router } from "express";
import { enrollCourse, getUser, getUsers } from "../controllers";
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
   *         name: pageNumber
   *         schema:
   *           type: number
   *           minimum: 1
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: number
   *           minimum: 1
   *           default: 10
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
  router.get("/api/users", getUsers);

  /**
   * @swagger
   * /api/courses/enroll:
   *   post:
   *     summary: Enroll in a course
   *     tags:
   *      - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              properties:
   *                courseId:
   *                  type: string
   *                  description: The id of course
   *     responses:
   *       200:
   *         description: Enroll in course successfully
   *       400:
   *         description: Invalid request body
   */
  router.post("/api/users/enroll", verifyAccessToken, enrollCourse);
};
