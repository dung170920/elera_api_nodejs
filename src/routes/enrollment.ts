import { Router } from "express";
import { verifyAccessToken } from "../middlewares";
import { enrollCourse, getEnrollments } from "../controllers";

/**
 * @swagger
 * components:
 *  schemas:
 *    Enrollment:
 *      type: object
 *      required:
 *        - userId
 *        - courseId
 *      properties:
 *        userId:
 *          type: string
 *          description: The id of user
 *        courseId:
 *          type: string
 *          description: The id of course
 *        createdAt:
 *          type: Date
 *          description: The date of enrollment
 */

export default (router: Router) => {
  /**
   * @swagger
   * /api/enrollments:
   *   post:
   *     summary: Enroll in a course
   *     tags:
   *      - Enrollments
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
  router.post("/api/enrollments", verifyAccessToken, enrollCourse);

  /**
   * @swagger
   * /api/enrollments:
   *   get:
   *     summary: Get a list of enrollment
   *     tags:
   *      - Enrollments
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
   *     responses:
   *       200:
   *         description: Response success.
   */
  router.get("/api/enrollments", verifyAccessToken, getEnrollments);
};
