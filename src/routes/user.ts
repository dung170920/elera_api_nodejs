import { Router } from "express";
import { getUser } from "../controllers";
import { authCheck } from "../middlewares";

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *    Register:
//  *      type: object
//  *      required:
//  *        - name
//  *        - email
//  *        - password
//  *        - confirmPassword
//  *      properties:
//  *        name:
//  *          type: string
//  *          description: The name of user
//  *        email:
//  *          type: string
//  *          description: The email of user
//  *        password:
//  *          type: string
//  *          description: The password of user
//  *        confirmPassword:
//  *          type: string
//  *          description: The confirm password of user
//  */

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
  router.get("/api/users/:id", authCheck, getUser);

  // /**
  //  * @swagger
  //  * /api/auth/login:
  //  *   post:
  //  *     summary: Login your account with email and password
  //  *     tags:
  //  *      - Auth
  //  *     requestBody:
  //  *       required: true
  //  *       content:
  //  *         application/json:
  //  *           schema:
  //  *             $ref: '#/components/schemas/Login'
  //  *     responses:
  //  *       200:
  //  *         description: Response success
  //  *       400:
  //  *         description: Invalid request body
  //  */
  // router.post("/api/auth/login", login);

  // router.post("/auth/login-google", loginGoogle);
};
