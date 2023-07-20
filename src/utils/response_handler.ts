import { Response } from "express";

const errorResponse = {
  200: {
    defaultMessage: "OK",
    statusCode: 200,
  },
  201: {
    defaultMessage: "Created",
    statusCode: 201,
  },
  204: {
    defaultMessage: "No Content",
    statusCode: 204,
  },
  400: {
    defaultMessage: "Bad request",
    statusCode: 400,
  },
  401: {
    defaultMessage: "Unauthorized",
    statusCode: 401,
  },
  403: {
    defaultMessage: "Forbidden",
    statusCode: 403,
  },

  404: {
    defaultMessage: "Not found",
    statusCode: 404,
  },
  405: {
    defaultMessage: "Method Not Allowed",
    statusCode: 405,
  },
  409: {
    defaultMessage: "Conflict",
    statusCode: 409,
  },
  410: {
    defaultMessage: "Gone",
    statusCode: 410,
  },
  500: {
    defaultMessage: "Internal server error",
    statusCode: 500,
  },
};

export const responseHandler = (
  res: Response,
  err: number,
  message?: string,
  result?: any
) => {
  const { defaultMessage, statusCode } = errorResponse[err];
  if (message && message.length !== 0) {
    return res.status(statusCode).json({ code: statusCode, message, result });
  } else {
    return res
      .status(statusCode)
      .json({ code: statusCode, message: defaultMessage, result });
  }
};
