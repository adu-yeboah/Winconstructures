import { Router } from "express";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty } from "../controllers/propertyController";

const router = Router()

router.get('/', getProperties)
router.get('/:id', getProperty)
router.post('/', createProperty)
router.put('/:id', updateProperty)
router.delete('/:id', deleteProperty)

export default router