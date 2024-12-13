import { Router } from "express";
import { getUser } from "../controller/user.controller";

const router = Router();
// routes
router.get("/getuser", getUser);

export default router;
