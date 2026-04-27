import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log(' Database connected successfully');

    // Log database info in development
    if (process.env.NODE_ENV === 'development') {
      const url = process.env.DATABASE_URL || '';
      console.log(' Database URL:', url.replace(/:[^:]+@/, ':****@'));
    }
  } catch (error) {
    console.error(' Database connection failed:', error);
    throw error;
  }
};
