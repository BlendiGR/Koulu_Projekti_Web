import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/index.js";

const globalForPrisma = globalThis;

if (!globalForPrisma.prismaAdapter) {
  globalForPrisma.prismaAdapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "schoolproject-dev",
    connectionLimit: 5,
  });
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    adapter: globalForPrisma.prismaAdapter,
  });
}

export const prisma = globalForPrisma.prisma;
