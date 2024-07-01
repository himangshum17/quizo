import express from "express";

import cors from "cors";
import routes from "../routes/index";

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

export default app;
