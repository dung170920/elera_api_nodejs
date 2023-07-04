import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import { log } from "./logger";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Elera REST API",
      version,
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    components: {
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
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  log.info(`Docs available at http://localhost:${port}`);
}
