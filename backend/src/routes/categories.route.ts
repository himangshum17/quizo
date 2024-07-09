import { Router } from "express";
import {
  addCategories,
  getCategories,
} from "../controller/categories.controller";

const router = Router();

// routes
router.get("/", getCategories);
router.post("/", addCategories);

export default router;
