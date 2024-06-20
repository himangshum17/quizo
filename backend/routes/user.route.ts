import { Router } from "express";
import { createUser } from "../controller/user.controller";

const router = Router();

// routes
router.post("/", createUser);

export default router;
