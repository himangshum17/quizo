import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { appConfig } from "../config/app.config";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    errorStack: appConfig.env === "development" ? err.stack : "",
  });
};

export { globalErrorHandler };
