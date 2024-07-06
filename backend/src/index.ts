import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { HttpError } from "http-errors";
import routes from "./routes/index";
import { appConfig } from "./config/app.config";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use(routes);

// global error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    errorStack: appConfig.env === "development" ? err.stack : "",
  });
});

export default app;
