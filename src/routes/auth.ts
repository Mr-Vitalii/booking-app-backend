import express from "express";
import { auth } from "../middleware";
import * as ctrl from "../controllers/auth";

const router = express.Router();

router.post("/login", ctrl.loginValidators, ctrl.login);

router.get("/validate-token", auth.verifyToken, ctrl.validateToken);

router.post("/logout", ctrl.logout);

export default router;
