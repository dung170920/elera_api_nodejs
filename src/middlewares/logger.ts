import { NextFunction, Request, Response } from "express";
import { log } from "../utils";

export function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  log.info(`${request.method} ${request.path}`);
  next();
}
