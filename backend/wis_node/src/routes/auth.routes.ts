import { Router } from "express";
import { Login, RefreshToken } from "../controllers/auth.controller";

const router = Router()

router.post("/login", Login)
router.post("/refresh", RefreshToken)

export default router