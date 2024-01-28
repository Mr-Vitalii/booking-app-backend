"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const ctrl = require("../controllers/auth");
const router = express_1.default.Router();
router.post("/login", ctrl.loginValidators, ctrl.login);
router.get("/validate-token", auth_1.default, ctrl.validateToken);
router.post("/logout", ctrl.logout);
exports.default = router;
