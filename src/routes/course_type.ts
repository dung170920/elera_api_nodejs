import {
  createCourseType,
  disableCourseType,
  getCourseTypeList,
  updateCourseType,
} from "../controllers";
import { Router } from "express";

/**
 * @swagger
 * components:
 *  schemas:
 *    CourseType:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto generated id of course type
 *          readOnly: true
 *        name:
 *          type: string
 *          description: The name of course type
 */

export default (router: Router) => {
  /**
   * @swagger
   * /api/course-types:
   *   get:
   *     summary: Get a list of course types
   *     tags:
   *      - CourseTypes
   *     responses:
   *       200:
   *        description: Response success.
   */
  router.get("/api/course-types", getCourseTypeList);

  // /**
  //  * @swagger
  //  * /api/course-types/{id}:
  //  *   get:
  //  *     summary: Get a course type by ID
  //  *     tags:
  //  *      - CourseTypes
  //  *     parameters:
  //  *       - in: path
  //  *         name: id
  //  *         schema:
  //  *           type: string
  //  *         required: true
  //  *     responses:
  //  *       200:
  //  *         description: Response success
  //  *       404:
  //  *         description: Course Type not found
  //  */
  // router.get("/api/course-types/:id", getCourseType);

  /**
   * @swagger
   * /api/course-types:
   *   post:
   *     summary: Create a new course type
   *     tags:
   *      - CourseTypes
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CourseType'
   *     responses:
   *       200:
   *         description: Response success
   *       400:
   *         description: Invalid request body
   */
  router.post("/api/course-types", createCourseType);

  /**
   * @swagger
   * /api/course-types/{id}:
   *   patch:
   *     summary: Update a course type
   *     tags:
   *      - CourseTypes
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CourseType'
   *     responses:
   *       200:
   *         description: Response success
   *       404:
   *         description: Course Type not found
   */
  router.patch("/api/course-types/:id", updateCourseType);

  /**
   * @swagger
   * /api/course-types/{id}:
   *   delete:
   *     summary: Delete a course type by ID
   *     tags:
   *      - CourseTypes
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
   *         description: Course Type not found
   */
  router.delete("/api/course-types/:id", disableCourseType);
};
