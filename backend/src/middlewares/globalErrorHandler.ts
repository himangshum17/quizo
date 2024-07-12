import { ErrorRequestHandler, Response } from "express";
import { z } from "zod";
import { appConfig } from "../config/app.config";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(BAD_REQUEST).json({
    errors,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH : ${req.path}`, err);

  if (err instanceof z.ZodError) {
    return handleZodError(res, err);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorStack: appConfig.nodeEnv === "development" ? err.stack : "",
  });
};

export { globalErrorHandler };
