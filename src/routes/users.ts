import express from "express";
import * as ctrl from "../controllers/user";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, ctrl.getCurrentUser);

router.post("/register", ctrl.registerValidators, ctrl.register);

export default router;
