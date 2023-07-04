import { Response } from "express";

export enum ErrorCode {
  NotFound = "NOT_FOUND",
  Unauthorized = "UNAUTHORIZED",
  BadRequest = "BAD_REQUEST",
  InternalServerError = "INTERNAL_SERVER_ERROR",
}

const errorResponse = {
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    defaultMessage: "Bad request",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    defaultMessage: "Unauthorized",
    statusCode: 401,
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    defaultMessage: "Not found",
    statusCode: 404,
  },
  INTERNAL_SERVER_ERROR: {
    code: "SERVER_ERROR",
    defaultMessage: "Internal server error",
    statusCode: 500,
  },
};

export const errorHandler = (
  res: Response,
  err: ErrorCode,
  message?: string
) => {
  const { code, defaultMessage, statusCode } = errorResponse[err];
  if (message) {
    return res.status(statusCode).json({ code, message });
  } else {
    return res.status(statusCode).json({ code, message: defaultMessage });
  }
};
