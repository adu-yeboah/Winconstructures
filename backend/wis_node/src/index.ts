import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import propertyRoute from "./routes/propertyRoute"
import authRoute from "./routes/authRoute"
import messageRoute from "./routes/messageRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Messages API' });
});
app.use('/api/auth', authRoute); 
app.use("/api/property", propertyRoute)
app.use("/api/message", messageRoute)



const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();