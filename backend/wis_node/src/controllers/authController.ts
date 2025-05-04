import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

export const Login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body
    try {
        if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
            res.status(401).json({ detail: "Invalid username or password" });
            return
        }
        const accessToken = jwt.sign(
            { email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { email },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            accessToken,
            refreshToken,
            detail: "Login successful",
        });

    } catch (error) {
        res.status(500).json({ detail: `Server error: ${(error as Error).message}` });
    }
})