"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Image Schema
const imageSchema = new mongoose_1.Schema({
    img: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true,
    },
});
const propertySchema = new mongoose_1.Schema({
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
            validator: (images) => images.length > 0,
            message: "At least one image is required",
        },
    },
});
const Property = mongoose_1.default.model("Property", propertySchema);
exports.default = Property;
