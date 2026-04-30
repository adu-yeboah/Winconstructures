import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary";

// Upload single image
export const uploadImage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  try {
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "winconstructures/properties",
      resource_type: "auto",
      quality: "auto",
      fetch_format: "auto",
    });

    // Return the secure URL
    res.status(200).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500);
    throw new Error("Failed to upload image to Cloudinary");
  }
});

// Delete image from Cloudinary
export const deleteImage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { publicId } = req.params;

  if (!publicId) {
    res.status(400);
    throw new Error("Public ID is required");
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res.status(500);
    throw new Error("Failed to delete image from Cloudinary");
  }
});
