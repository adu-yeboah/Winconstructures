"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
            res.status(401).json({ detail: "Invalid username or password" });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            accessToken,
            refreshToken,
            detail: "Login successful",
        });
    }
    catch (error) {
        res.status(500).json({ detail: `Server error: ${error.message}` });
    }
});
