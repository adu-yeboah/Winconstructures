import { Router } from "express";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty, getSimilarProperties } from "../controllers/property.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router()

// Public routes - anyone can view properties
router.get('/', getProperties)
router.get('/:id', getProperty)
router.get('/:id/similar', getSimilarProperties)

// Protected routes - only admin can modify properties
router.post('/', protect, createProperty)
router.put('/:id', protect, updateProperty)
router.delete('/:id', protect, deleteProperty)

export default router