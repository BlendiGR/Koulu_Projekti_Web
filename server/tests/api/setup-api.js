import prisma from "../../src/prisma.js";
import bcrypt from "bcrypt";

export const testUsers ={
    admin: {
        email: "tester@admin.fi",
        username: "testAdmin",
        password: "testpassword",
        role: "ADMIN",
    },
    user: {
        email: "testUser",
        username: "testUser",
        password: "userpassword",
        role: "CUSTOMER",
    }
}

const seedTestUsers = async () => {
    const password = await bcrypt.hash(testUsers.admin.password, 10);
    const adminUser = await prisma.user.upsert({
        where: { email: testUsers.admin.email },
        update: { username: testUsers.admin.username, role: testUsers.admin.role, password },
        create: {
            username: testUsers.admin.username,
            role: testUsers.admin.role,
            email: testUsers.admin.email,
            password,
        },
    });
    console.log("Created/updated test admin user:", adminUser.email);

    const userPassword = await bcrypt.hash(testUsers.user.password, 10);
    const normalUser = await prisma.user.upsert({
        where: { email: testUsers.user.email },
        update: { username: testUsers.user.username, role: testUsers.user.role, password: userPassword },
        create: {
            username: testUsers.user.username,
            role: testUsers.user.role,
            email: testUsers.user.email,
            password: userPassword,
        },
    });
    console.log("Created/updated test normal user:", normalUser.email);
    console.log("Test seeding completed");
};

const deleteTestUsers = async () => {
       await prisma.user.deleteMany({
        where: {
            email: { in: [testUsers.admin.email, testUsers.user.email] }
        }
    });
    console.log("Deleted test users");
};

beforeAll(async () => {
    await prisma.$connect();
    try {
        await seedTestUsers();
        global.prisma = prisma;
    } catch (e) {
        // ensure we don't leave a connected pool if seeding fails
        // eslint-disable-next-line no-console
        console.error("Seeding failed, disconnecting prisma:", e);
        try { await prisma.$disconnect(); } catch (_) {}
        throw e;
    }
});

afterAll(async () => {
    try {
        await deleteTestUsers();
        await prisma.$disconnect();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error during prisma.$disconnect():", e);
    }

    if (global.__SERVER__ && typeof global.__SERVER__.close === "function") {
        await new Promise((resolve) => global.__SERVER__.close(() => resolve()));
    }
});
