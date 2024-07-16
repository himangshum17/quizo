import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { appConfig } from "./config/app.config";

const app = express();

const corsOptions = {
  origin: appConfig.appOrigin,
  credentials: true,
};
// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use(routes);

// global error handler
app.use(globalErrorHandler);

export default app;
