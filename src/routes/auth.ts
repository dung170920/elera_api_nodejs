import { login, register } from "../controllers";
import { Router } from "express";

/**
 * @swagger
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *        - confirmPassword
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
 *        confirmPassword:
 *          type: string
 *          description: The confirm password of user
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
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
   * /api/auth/register:
   *   post:
   *     summary: Create a new account
   *     tags:
   *      - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Register'
   *     responses:
   *       200:
   *         description: Response success
   *       400:
   *         description: Invalid request body
   */
  router.post("/auth/register", register);

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login your account with email and password
   *     tags:
   *      - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Login'
   *     responses:
   *       200:
   *         description: Response success
   *       400:
   *         description: Invalid request body
   */
  router.post("/api/auth/login", login);

  // router.post("/auth/login-google", loginGoogle);
};
