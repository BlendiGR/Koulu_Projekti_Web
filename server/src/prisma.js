import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/index.js";
import 'dotenv/config';

let prisma;

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});


if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({adapter: adapter});
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter: adapter,
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prisma;
}

export default prisma;