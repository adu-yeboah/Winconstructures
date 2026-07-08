import { Router } from "express";
import { Login, RefreshToken, GetCurrentUser } from "../controllers/auth.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router()

router.post("/login", Login)
router.post("/refresh", RefreshToken)
router.get("/me", protect, GetCurrentUser)

export default router