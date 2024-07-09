import { Router } from "express";
import { getCategories } from "../controller/categories.controller";

const router = Router();

// routes
router.get("/", getCategories);

export default router;
