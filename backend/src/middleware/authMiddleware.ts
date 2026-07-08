import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    email: string;
    role: string;
  };
}

export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

      // Attach user information to request
      req.user = {
        email: decoded.email,
        role: decoded.role || "admin"
      };

      next();
    } catch (error) {
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