import { Router } from "express";
import userRoutes from "./user.route";
import categoriesRoutes from "./categories.route";
import { ROUTES } from "./routes";

const router = Router();
router.use(ROUTES.AUTH, userRoutes);
router.use(ROUTES.CATEGORIES, categoriesRoutes);

export default router;
