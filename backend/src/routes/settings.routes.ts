import express from "express";
import {
  getAllSettings,
  getSettingsByCategory,
  getPublicSettings,
  updateSetting,
  bulkUpdateSettings,
  initializeSettings,
} from "../controllers/settings.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/public", getPublicSettings);

// Protected routes (admin only)
router.use(protect);
router.get("/", getAllSettings);
router.get("/category/:category", getSettingsByCategory);
router.put("/bulk", bulkUpdateSettings);
router.put("/:key", updateSetting);
router.post("/initialize", initializeSettings);

export default router;
