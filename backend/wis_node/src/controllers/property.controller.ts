import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../config/database.prisma";

// Get All Properties
export const getProperties = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const properties = await prisma.property.findMany({
        include: {
          images: true,
          listedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' }
    });

    // Transform to match frontend expectations
    const transformedProperties = properties.map(property => ({
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        status: property.status,
        type: property.type,
        images: property.images.map(img => ({ img: img.img })),
        featured: property.featured,
        viewCount: property.viewCount,
        listedById: property.listedById,
        listedBy: property.listedBy,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
    }));

    res.status(200).json(transformedProperties);
});

// Get A Single Property by ID
export const getProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const propertyId = parseInt(req.params.id);

    if (isNaN(propertyId)) {
        res.status(400);
        throw new Error("Invalid property ID");
    }

    const property = await prisma.property.findUnique({
        where: { id: propertyId },
        include: {
          images: true,
          listedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        }
    });

    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }

    // Transform to match frontend expectations
    const transformedProperty = {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        status: property.status,
        type: property.type,
        images: property.images.map(img => ({ img: img.img })),
        featured: property.featured,
        viewCount: property.viewCount,
        listedById: property.listedById,
        listedBy: property.listedBy,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
    };

    res.status(200).json(transformedProperty);
});

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
        featured,
    } = req.body;

    // Validation
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

    // Default admin user (first user in database)
    const adminUser = await prisma.user.findFirst();
    if (!adminUser) {
        res.status(500);
        throw new Error("No admin user found. Please create an admin user first.");
    }

    // Create property with images
    const property = await prisma.property.create({
        data: {
            title,
            description,
            location,
            price,
            bedrooms,
            bathrooms,
            area,
            status,
            type,
            featured: featured || false,
            viewCount: 0,
            listedById: adminUser.id,
            images: {
                create: images.map((img: { img: string }) => ({
                    img: img.img
                }))
            }
        },
        include: {
            images: true,
            listedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            }
        }
    });

    // Transform response
    const transformedProperty = {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        status: property.status,
        type: property.type,
        images: property.images.map(img => ({ img: img.img })),
        featured: property.featured,
        viewCount: property.viewCount,
        listedById: property.listedById,
        listedBy: property.listedBy,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
    };

    res.status(201).json(transformedProperty);
});

// Update a property
export const updateProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const propertyId = parseInt(req.params.id);

    if (isNaN(propertyId)) {
        res.status(400);
        throw new Error("Invalid property ID");
    }

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
        featured,
    } = req.body;

    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
        where: { id: propertyId }
    });

    if (!existingProperty) {
        res.status(404);
        throw new Error("Property not found");
    }

    // Update property
    const updatedProperty = await prisma.property.update({
        where: { id: propertyId },
        data: {
            title: title !== undefined ? title : existingProperty.title,
            description: description !== undefined ? description : existingProperty.description,
            location: location !== undefined ? location : existingProperty.location,
            price: price !== undefined ? price : existingProperty.price,
            bedrooms: bedrooms !== undefined ? bedrooms : existingProperty.bedrooms,
            bathrooms: bathrooms !== undefined ? bathrooms : existingProperty.bathrooms,
            area: area !== undefined ? area : existingProperty.area,
            status: status !== undefined ? status : existingProperty.status,
            type: type !== undefined ? type : existingProperty.type,
            featured: featured !== undefined ? featured : existingProperty.featured,
        },
        include: {
            images: true,
            listedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            }
        }
    });

    // Handle images separately if provided
    if (images && Array.isArray(images) && images.length > 0) {
        // Delete existing images
        await prisma.propertyImage.deleteMany({
            where: { propertyId }
        });

        // Create new images
        await prisma.propertyImage.createMany({
            data: images.map((img: { img: string }) => ({
                propertyId,
                img: img.img
            }))
        });

        // Fetch updated property with new images
        const propertyWithImages = await prisma.property.findUnique({
            where: { id: propertyId },
            include: {
                images: true,
                listedBy: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }
        });

        if (propertyWithImages) {
            // Transform response
            const transformedProperty = {
                id: propertyWithImages.id,
                title: propertyWithImages.title,
                description: propertyWithImages.description,
                location: propertyWithImages.location,
                price: propertyWithImages.price,
                bedrooms: propertyWithImages.bedrooms,
                bathrooms: propertyWithImages.bathrooms,
                area: propertyWithImages.area,
                status: propertyWithImages.status,
                type: propertyWithImages.type,
                images: propertyWithImages.images.map(img => ({ img: img.img })),
                featured: propertyWithImages.featured,
                viewCount: propertyWithImages.viewCount,
                listedById: propertyWithImages.listedById,
                listedBy: propertyWithImages.listedBy,
                createdAt: propertyWithImages.createdAt,
                updatedAt: propertyWithImages.updatedAt,
            };

            res.status(200).json(transformedProperty);
            return;
        }
    }

    // Fetch the updated property with all relationships
    const finalProperty = await prisma.property.findUnique({
        where: { id: propertyId },
        include: {
            images: true,
            listedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            }
        }
    });

    if (!finalProperty) {
        res.status(404);
        throw new Error("Property not found after update");
    }

    // Transform response
    const transformedProperty = {
        id: finalProperty.id,
        title: finalProperty.title,
        description: finalProperty.description,
        location: finalProperty.location,
        price: finalProperty.price,
        bedrooms: finalProperty.bedrooms,
        bathrooms: finalProperty.bathrooms,
        area: finalProperty.area,
        status: finalProperty.status,
        type: finalProperty.type,
        images: finalProperty.images.map(img => ({ img: img.img })),
        featured: finalProperty.featured,
        viewCount: finalProperty.viewCount,
        listedById: finalProperty.listedById,
        listedBy: finalProperty.listedBy,
        createdAt: finalProperty.createdAt,
        updatedAt: finalProperty.updatedAt,
    };

    res.status(200).json(transformedProperty);
});

// Delete a property
export const deleteProperty = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const propertyId = parseInt(req.params.id);

    if (isNaN(propertyId)) {
        res.status(400);
        throw new Error("Invalid property ID");
    }

    // Check if property exists
    const property = await prisma.property.findUnique({
        where: { id: propertyId }
    });

    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }

    // Delete property (images will be deleted automatically due to cascade)
    await prisma.property.delete({
        where: { id: propertyId }
    });

    res.status(200).json({ message: "Property deleted successfully" });
});