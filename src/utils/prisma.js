// utils/prisma.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

// Ensure the Prisma client is disconnected after all queries are done
if (process.env.NODE_ENV === "production") {
  global.prisma = prisma;
}

export default prisma;
