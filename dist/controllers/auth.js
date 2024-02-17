"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.validateToken = exports.googleLogin = exports.login = exports.loginValidators = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.loginValidators = [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
];
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 86400000,
        });
        res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 86400000,
            });
            res.status(200).json({ userId: user._id });
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const newUser = new user_1.default({
                firstName: req.body.name,
                email: req.body.email,
                password: generatedPassword,
                avatar: req.body.photo,
            });
            yield newUser.save();
            const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 86400000,
            });
            return res.status(200).send({ message: "User registered OK" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.googleLogin = googleLogin;
const validateToken = (req, res) => {
    res.status(200).send({ userId: req.userId });
};
exports.validateToken = validateToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("auth_token", "", {
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        expires: new Date(0),
    });
    res.send();
});
exports.logout = logout;
