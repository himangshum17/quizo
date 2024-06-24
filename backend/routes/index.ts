import { Router } from "express";
import userRoutes from "./user.route";
import { ROUTES } from "./routes";

const router = Router();
router.use(ROUTES.REGISTER, userRoutes);

export default router;
