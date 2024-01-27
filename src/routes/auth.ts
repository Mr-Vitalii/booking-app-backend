import express from "express";
const ctrl = require("../controllers/auth");

const router = express.Router();

router.post("/login", ctrl.loginValidators, ctrl.login);

export default router;
