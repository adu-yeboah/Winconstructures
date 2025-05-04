import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.DATABASE_URL;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env');
        }
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};