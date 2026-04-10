import { prisma } from './src/config/prisma.js';

async function check() {
  const users = await prisma.user.findMany();
  console.log('Users in DB:', users);
  const companies = await prisma.company.findMany();
  console.log('Companies in DB:', companies);
}

check();
