import { Router } from "express";
import authRoutes from "./auth.route";
import categoriesRoutes from "./categories.route";
import userRoutes from "./user.route";
import { ROUTES } from "./routes";
import { authenticate } from "../middlewares/authenticate";

const router = Router();
// public routes
router.use(ROUTES.AUTH, authRoutes);
// protected routes
router.use(ROUTES.CATEGORIES, categoriesRoutes);
router.use(ROUTES.USER, authenticate, userRoutes);

export default router;
