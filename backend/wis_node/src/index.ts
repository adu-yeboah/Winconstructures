import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma, { initializeDatabase } from './config/database.prisma';

import propertyRoute from "./routes/propertyRoute"
import authRoute from "./routes/auth.routes"
import messageRoute from "./routes/message.routes"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));


// Request logging middleware (MUST be before routes to work properly)
app.use((req, res, next) => {
  const start = Date.now();

  // Log incoming request
  console.log('\n========================================');
  console.log('INCOMING REQUEST');
  console.log('========================================');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', req.body ? JSON.stringify(req.body, null, 2) : 'No body');
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('========================================\n');

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log('\n========================================');
    console.log('OUTGOING RESPONSE');
    console.log('========================================');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Status:', res.statusCode);
    console.log('Duration:', `${duration}ms`);
    console.log('========================================\n');
  });

  next();
});

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to Winconstructures API' });
});
app.use('/api/auth', authRoute);
app.use("/api/property", propertyRoute)
app.use("/api/message", messageRoute)

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});


const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();