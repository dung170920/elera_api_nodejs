import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { log } from "./logger";
import { Role } from "../shared";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Elera - OpenAPI 3.0",
      version: "1.0.0",
    },
    externalDocs: {
      url: "/swagger.json",
    },
    paths: {
      //User
      "/api/user/register": {
        post: {
          tags: ["User"],
          summary: "Create new account",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserRegisterRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/user/login": {
        post: {
          tags: ["User"],
          summary: "Log user into the system",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserLoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/user/google-login": {
        post: {
          tags: ["User"],
          summary: "Login with google account",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserGoogleLoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/user/refresh-token": {
        post: {
          tags: ["User"],
          summary: "Get new access token",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserRefreshTokenRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/user/logout": {
        post: {
          tags: ["User"],
          summary: "Log user out the system",
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/user": {
        get: {
          tags: ["User"],
          summary: "Get list of user",
          parameters: [
            {
              name: "pageNumber",
              in: "query",
              schema: {
                type: "number",
              },
              default: 1,
            },
            {
              name: "pageSize",
              in: "query",
              schema: {
                type: "number",
              },
              default: 10,
            },
            {
              name: "role",
              in: "query",
              schema: {
                type: "string",
                enum: [Role.user, Role.mentor],
              },
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/user/{id}": {
        get: {
          tags: ["User"],
          summary: "Get user by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },

      //Course Type
      "/api/course-type": {
        get: {
          tags: ["Course Type"],
          summary: "Get list of course type",
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Course Type"],
          summary: "Create a new course type",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CourseTypeRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/course-type/{id}": {
        patch: {
          tags: ["Course Type"],
          summary: "Update a course type",
          parameters: [
            {
              name: "id",
              in: "path",
              type: "string",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CourseTypeRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Course Type"],
          summary: "Delete a course type",
          parameters: [
            {
              name: "id",
              in: "path",
              schema: {
                type: "string",
              },
            },
          ],

          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },

      //Course
      "/api/course": {
        get: {
          tags: ["Course"],
          summary: "Get list of course",
          parameters: [
            {
              name: "pageNumber",
              in: "query",
              schema: {
                type: "number",
              },
              default: 1,
            },
            {
              name: "pageSize",
              in: "query",
              schema: {
                type: "number",
              },
              default: 10,
            },
            {
              name: "isPopular",
              in: "query",
              default: false,
              schema: {
                type: "boolean",
                enum: [false, true],
              },
              nullable: false,
              description: "True for get top 3 popular course",
            },
            {
              name: "courseTypeId",
              in: "query",
              type: "string",
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Course"],
          summary: "Create a new course",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  $ref: "#/components/schemas/CourseRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/course/{id}": {
        get: {
          tags: ["Course"],
          summary: "Get course by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ["Course"],
          summary: "Update a course",
          parameters: [
            {
              name: "id",
              in: "path",
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  $ref: "#/components/schemas/CourseRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Course"],
          summary: "Delete a course",
          parameters: [
            {
              name: "id",
              in: "path",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },

      //Enrollment
      "/api/enrollment": {
        get: {
          tags: ["Enrollment"],
          summary: "Get list of enrollment for user",
          parameters: [
            {
              name: "pageNumber",
              in: "query",
              schema: {
                type: "number",
              },
              default: 1,
            },
            {
              name: "pageSize",
              in: "query",
              schema: {
                type: "number",
              },
              default: 10,
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Enrollment"],
          summary: "Enroll in a course",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EnrollmentRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        patch: {
          tags: ["Enrollment"],
          summary: "Update progress of enrollment",
          parameters: [
            {
              name: "courseId",
              in: "query",
              schema: {
                type: "string",
              },
            },
            {
              name: "lessonId",
              in: "query",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },

      //BookMark
      "/api/bookmark": {
        get: {
          tags: ["Bookmark"],
          summary: "Get list of bookmark for user",
          parameters: [
            {
              name: "pageNumber",
              in: "query",
              schema: {
                type: "number",
              },
              default: 1,
            },
            {
              name: "pageSize",
              in: "query",
              schema: {
                type: "number",
              },
              default: 10,
            },
          ],
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Bookmark"],
          summary: "Add course to bookmark",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BookmarkRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Bookmark"],
          summary: "Remove course from bookmark",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BookmarkRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Success",
              content: {
                "text/plain": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
                "text/json": {
                  schema: {
                    $ref: "#/components/schemas/APIResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        APIResponse: {
          type: "object",
          properties: {
            code: { type: "integer", format: "int32" },
            message: { type: "string" },
            result: {
              nullable: true,
            },
          },
        },
        UserRegisterRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
            confirmPassword: {
              type: "string",
            },
          },
          xml: { name: "User" },
        },
        UserLoginRequest: {
          type: "object",
          properties: {
            email: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
        UserGoogleLoginRequest: {
          type: "object",
          properties: {
            idToken: {
              type: "string",
            },
          },
        },
        UserRefreshTokenRequest: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
            },
          },
        },
        CourseTypeRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
        },
        CourseLesson: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            duration: {
              type: "number",
              example: 60,
              description: "Format is second",
            },
            video: {
              type: "file",
              in: "formData",
            },
          },
        },
        CourseSection: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            lessons: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CourseLesson",
              },
            },
          },
        },
        CourseRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "number",
            },
            courseTypeId: {
              type: "string",
            },
            image: {
              type: "file",
              in: "formData",
            },
            sections: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CourseSection",
              },
            },
          },
        },
        EnrollmentRequest: {
          type: "object",
          properties: {
            courseId: {
              type: "string",
            },
          },
        },
        BookmarkRequest: {
          type: "object",
          properties: {
            courseId: {
              type: "string",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          name: "Authorization",
          in: "header",
        },
      },
    },
    schemes: ["http", "https"],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: string | number) {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}`);
}
