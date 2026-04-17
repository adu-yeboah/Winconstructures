import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendLoginAlert } from "../utils/mailer";

dotenv.config();

export const Login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
      // Validate required fields
      if (!email || !password) {
        res.status(400).json({ detail: "Email and password are required" });
        return;
      }

      // Get admin credentials from environment variables
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      // Check if environment variables are configured
      if (!adminEmail || !adminPassword) {
        console.error(
          "Admin credentials not configured in environment variables",
        );
        res.status(500).json({ detail: "Server configuration error" });
        return;
      }

      // Validate credentials against environment variables
      if (email !== adminEmail || password !== adminPassword) {
        // Send failed login alert (don't wait for email to complete)
        sendLoginAlert({
          email,
          timestamp: new Date(),
          successful: false
        }).catch(emailError => {
          console.error('Failed to send login alert email:', emailError);
        });

        res.status(401).json({ detail: "Invalid email or password" });
        return;
      }

      // Generate access token
      const accessToken = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" },
      );

      // Send successful login alert (don't wait for email to complete)
      sendLoginAlert({
        email,
        timestamp: new Date(),
        successful: true
      }).catch(emailError => {
        console.error('Failed to send login alert email:', emailError);
      });

      // Return successful response with tokens and user info
      res.status(200).json({
        accessToken,
        refreshToken,
        detail: "Login successful",
        user: {
          email,
          firstName: "Admin",
          lastName: "User",
          role: "Super Admin",
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ detail: `Server error: ${(error as Error).message}` });
    }
  },
);
