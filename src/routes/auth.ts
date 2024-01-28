import express from "express";
import verifyToken from "../middleware/auth";
const ctrl = require("../controllers/auth");

const router = express.Router();

router.post("/login", ctrl.loginValidators, ctrl.login);

router.get("/validate-token", verifyToken, ctrl.validateToken);

router.post("/logout", ctrl.logout);

export default router;
