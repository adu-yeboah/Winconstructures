import { Router } from "express";
import {
  getDashboardStats,
  getPropertyAnalytics,
  getMessageStats
} from "../controllers/analytics.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// All analytics routes require authentication
router.use(protect);

// Dashboard overview stats
router.get("/dashboard", getDashboardStats);

// Property-specific analytics
router.get("/property/:id", getPropertyAnalytics);

// Message statistics
router.get("/messages", getMessageStats);

export default router;