import { ErrorRequestHandler } from "express";
import { appConfig } from "../config/app.config";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH : ${req.path}`, err);

  return res.status(INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorStack: appConfig.env === "development" ? err.stack : "",
  });
};

export { globalErrorHandler };
