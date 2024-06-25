import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controller/user.controller";

const router = Router();

// routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
