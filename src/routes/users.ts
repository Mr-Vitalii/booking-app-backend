import express from "express";
const ctrl = require("../controllers/user");

const router = express.Router();

router.post("/register", ctrl.registerValidators, ctrl.register);

export default router;
