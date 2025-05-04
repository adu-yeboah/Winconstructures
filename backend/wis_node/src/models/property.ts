import mongoose, { Schema, Document } from "mongoose";

// Interface for Image
interface Image {
  img: string;
}

// Interface for Property
interface Property extends Document {
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: "For Sale" | "For Rent";
  type: "House" | "Condo" | "Apartment";
  images: Image[];
}



// Image Schema
const imageSchema = new Schema<Image>({
  img: {
    type: String,
    required: [true, "Image URL is required"],
    trim: true,
  },
});

const propertySchema = new Schema<Property>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  price: {
    type: String,
    required: [true, "Price is required"],
    trim: true,
  },
  bedrooms: {
    type: Number,
    required: [true, "Number of bedrooms is required"],
    min: [0, "Bedrooms cannot be negative"],
  },
  bathrooms: {
    type: Number,
    required: [true, "Number of bathrooms is required"],
    min: [0, "Bathrooms cannot be negative"],
  },
  area: {
    type: String,
    required: [true, "Area is required"],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: {
      values: ["For Sale", "For Rent"],
      message: "Status must be either 'For Sale' or 'For Rent'",
    },
  },
  type: {
    type: String,
    required: [true, "Type is required"],
    enum: {
      values: ["House", "Condo", "Apartment"],
      message: "Type must be either 'House', 'Condo', or 'Apartment'",
    },
  },
  images: {
    type: [imageSchema],
    required: [true, "At least one image is required"],
    validate: {
      validator: (images: Image[]) => images.length > 0,
      message: "At least one image is required",
    },
  },
});

const Property = mongoose.model<Property>("Property", propertySchema);
export default Property