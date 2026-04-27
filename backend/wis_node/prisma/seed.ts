import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

declare const process: { exit(code?: number): never; };

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminEmail = 'admin@winconstructures.com';
  const adminPassword = 'SecureAdminPassword123!';

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log('Admin user already exists:', existingAdmin.email);
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isActive: true,
      }
    });

    console.log('Admin user created successfully:', admin.email);
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });