"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controllers/property.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes - anyone can view properties
router.get('/', property_controller_1.getProperties);
router.get('/:id', property_controller_1.getProperty);
router.get('/:id/similar', property_controller_1.getSimilarProperties);
// Protected routes - only admin can modify properties
router.post('/', authMiddleware_1.protect, property_controller_1.createProperty);
router.put('/:id', authMiddleware_1.protect, property_controller_1.updateProperty);
router.delete('/:id', authMiddleware_1.protect, property_controller_1.deleteProperty);
exports.default = router;
