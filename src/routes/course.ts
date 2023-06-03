import { createCourse, getCourse, getCourseList } from "../controllers";
import { Router } from "express";

/**
 * @swagger
 * components:
 *  schemas:
 *    Course:
 *      type: object
 *      required:
 *        - title
 *        - price
 *        - courseType
 *      properties:
 *        id:
 *          type: string
 *          description: The auto generated id of course
 *          readOnly: true
 *        title:
 *          type: string
 *          description: The title of course
 *        description:
 *          type: string
 *          description: The description of course
 *        price:
 *          type: number
 *          description: The price of course
 *        courseType:
 *          type: string
 *          description: The ID of course type
 *        imageUrl:
 *          type: string
 *          description: The image url of course
 *        trailerUrl:
 *          type: string
 *          description: The trailer url of course
 */

export default (router: Router) => {
  /**
   * @swagger
   * /api/courses:
   *   get:
   *     summary: Get a list of courses
   *     tags:
   *      - Courses
   *     responses:
   *       200:
   *         description: Response success.
   */
  router.get("/api/courses", getCourseList);

  /**
   * @swagger
   * /api/courses/{id}:
   *   get:
   *     summary: Get a course by ID
   *     tags:
   *      - Courses
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
   *         description: Course not found
   */
  router.get("/api/courses/:id", getCourse);

  /**
   * @swagger
   * /api/courses:
   *   post:
   *     summary: Create a new course
   *     tags:
   *      - Courses
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Course'
   *     responses:
   *       200:
   *         description: Response success
   *       400:
   *         description: Invalid request body
   */
  router.post("/api/courses", createCourse);
};
