import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

if (!globalForPrisma.prismaAdapter) {
  globalForPrisma.prismaAdapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourpassword",
    database: "yourdbname",
    connectionLimit: 5,
  });
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    adapter: globalForPrisma.prismaAdapter,
  });
}

export const prisma = globalForPrisma.prisma;
