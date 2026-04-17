import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Property from "../models/property";

// Get All Properties
export const getProperties = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const properties = await Property.find();
    res.status(200).json(properties);
})

// Get A Single Property by ID
export const getProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const property = await Property.findById(req.body.id);
    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }
    res.status(200).json(property);
})

// Create New Property
export const createProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {
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
    } = req.body;

    //   Validation
    if (
        !title ||
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
        images.length === 0
    ) {
        res.status(400);
        throw new Error("All fields are required, including at least one image");
    }

    const property = await Property.create({
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
export const updateProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {
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
    } = req.body;

    const property = await Property.findById(req.params.id);
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
export const deleteProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const property = await Property.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }

    await property.deleteOne();
    res.status(200).json({ message: "Property deleted" });
});