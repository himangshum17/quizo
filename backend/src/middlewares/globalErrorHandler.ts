import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";
import { appConfig } from "../config/app.config";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { AppError } from "../utils/apperror";

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(BAD_REQUEST).json({
    errors,
  });
};

const handleAppError = (res: Response, err: AppError) => {
  return res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH : ${req.path}`, err);

  if (err instanceof z.ZodError) {
    return handleZodError(res, err);
  }

  if (err instanceof AppError) {
    return handleAppError(res, err);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorStack: appConfig.nodeEnv === "development" ? err.stack : "",
  });
};

export { globalErrorHandler };
