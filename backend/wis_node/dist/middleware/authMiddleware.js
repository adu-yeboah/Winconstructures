"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Attach user information to request
            req.user = {
                email: decoded.email,
                role: decoded.role || "admin"
            };
            next();
        }
        catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ detail: "Not authorized, token failed" });
            return;
        }
    }
    if (!token) {
        res.status(401).json({ detail: "Not authorized, no token" });
        return;
    }
});
