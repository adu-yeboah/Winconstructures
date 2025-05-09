"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getProperty = exports.getProperties = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const property_1 = __importDefault(require("../models/property"));
// Get All Properties
exports.getProperties = (0, express_async_handler_1.default)(async (req, res) => {
    const properties = await property_1.default.find();
    res.status(200).json(properties);
});
// Get A Single Property by ID
exports.getProperty = (0, express_async_handler_1.default)(async (req, res) => {
    const property = await property_1.default.findById(req.body.id);
    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }
    res.status(200).json(property);
});
// Create New Property
exports.createProperty = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, description, location, price, bedrooms, bathrooms, area, status, type, images, } = req.body;
    //   Validation
    if (!title ||
        !description ||
        !location ||
        !price ||
        bedrooms == null ||
        bathrooms == null ||
        !area ||
        !status ||
        !type ||
        !images ||
        !Array.isArray(images) ||
        images.length === 0) {
        res.status(400);
        throw new Error("All fields are required, including at least one image");
    }
    const property = await property_1.default.create({
        title,
        description,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        status,
        type,
        images,
    });
    res.status(201).json(property);
});
// Update a property
exports.updateProperty = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, description, location, price, bedrooms, bathrooms, area, status, type, images, } = req.body;
    const property = await property_1.default.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }
    // Update only provided fields
    property.title = title || property.title;
    property.description = description || property.description;
    property.location = location || property.location;
    property.price = price || property.price;
    property.bedrooms = bedrooms != null ? bedrooms : property.bedrooms;
    property.bathrooms = bathrooms != null ? bathrooms : property.bathrooms;
    property.area = area || property.area;
    property.status = status || property.status;
    property.type = type || property.type;
    property.images = images && Array.isArray(images) && images.length > 0 ? images : property.images;
    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
});
// Delete a property
exports.deleteProperty = (0, express_async_handler_1.default)(async (req, res) => {
    const property = await property_1.default.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }
    await property.deleteOne();
    res.status(200).json({ message: "Property deleted" });
});
