import { Router } from "express";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty } from "../controllers/propertyController";
import { protect } from "../middleware/authMiddleware";

const router = Router()

// Public routes - anyone can view properties
router.get('/', getProperties)
router.get('/:id', getProperty)

// Protected routes - only admin can modify properties
router.post('/', protect, createProperty)
router.put('/:id', protect, updateProperty)
router.delete('/:id', protect, deleteProperty)

export default router