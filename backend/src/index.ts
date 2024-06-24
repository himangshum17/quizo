import express from "express";
import "dotenv/config";
import routes from "../routes/index";

const app = express();

const PORT = process.env.PORT ?? 5000;

// middlewares
app.use(express.json());

// routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
