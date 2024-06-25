import express from "express";
import "dotenv/config";
import cors from "cors";
import routes from "../routes/index";

const app = express();

const PORT = process.env.PORT ?? 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
// middlewares
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
