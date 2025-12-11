import prisma from "../src/prisma.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const main = async () => {
  console.log("Seeding...");

  // 1. Create the initial admin user
  const password = await bcrypt.hash(process.env.ADMIN_PW, 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@fooder.fi" },
    update: {},
    create: {
      username: "admin",
      role: "ADMIN",
      email: "admin@fooder.fi",
      password: password,
      locale: "fi",
    },
  });

  // 1.1. Create a regular user
  const passwordUser = await bcrypt.hash("Salakala123", 10);
  const user = await prisma.user.upsert({
    where: { email: "mikko@metropolia.fi" },
    update: {},
    create: {
      username: "Mikko Mallikas",
      role: "CUSTOMER",
      email: "mikko@metropolia.fi",
      password: passwordUser,
      locale: "fi",
    },
  });

  // 2. Create products (name must be unique for upsert to work)
  const product1 = await prisma.product.upsert({
    where: { name: "Crispy Fries" },
    update: {},
    create: {
      type: "FOOD",
      name: "Crispy Fries",
      cost: 3.99,
      diets: ["vegan", "vegetarian"],
      imageUrl: "src/assets/images/French Fries.png",
      ingredients: ["Potato", "Oil", "Salt", "Pepper"],
    },
  });

  const product2 = await prisma.product.upsert({
    where: { name: "Chicken Nuggets" },
    update: {},
    create: {
      type: "FOOD",
      name: "Chicken Nuggets",
      cost: 6.99,
      diets: ["vegan", "vegetarian"],
      imageUrl: "src/assets/images/Chicken Nuggets.png",
      ingredients: ["Chicken", "Breading", "Salt", "Pepper"],
    },
  });

  const product3 = await prisma.product.upsert({
    where: { name: "Cheese Burger" },
    update: {},
    create: {
      type: "FOOD",
      name: "Cheese Burger",
      cost: 8.99,
      diets: ["vegan", "vegetarian"],
      imageUrl: "src/assets/images/Cheese Burger.png",
      ingredients: [
        "Beef",
        "Cheddar",
        "Ketchup",
        "Mustard",
        "Mayonnaise",
        "Lettuce",
        "Tomato",
        "Onion",
      ],
    },
  });

  // 3. Create a sample order — but we avoid duplicates
  const order = await prisma.order.upsert({
    where: { orderId: 1 },   // Ensure orderId is auto-increment PK
    update: {},
    create: {
      status: "PREPARING",
      cost: 12.48,
      destinationAddress: "Test Street 123",
      userId: admin.userId,
      phone: "0441234567",
    },
  });

  // 4. Attach products to the order (idempotent)
  await prisma.orderProduct.upsert({
    where: {
      orderId_productId: { orderId: order.orderId, productId: product1.productId },
    },
    update: {},
    create: {
      orderId: order.orderId,
      productId: product1.productId,
    },
  });

  await prisma.orderProduct.upsert({
    where: {
      orderId_productId: { orderId: order.orderId, productId: product2.productId },
    },
    update: {},
    create: {
      orderId: order.orderId,
      productId: product2.productId,
    },
  });

  // 5. Seed announcement (singleton)
  await prisma.announcement.upsert({
    where: { isSingleton: true },
    update: {}, // or update values if you want
    create: {
      title: "Welcome to Fooder!",
      message: "Thank you for using Fooder. We hope you enjoy your experience!",
      isActive: true,
      isSingleton: true, // must match the unique field
    },
  });

  // 6. Seed coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      discount: Number(10).toFixed(2),
      isActive: true,
    }
  });

  console.log("Seeding complete.");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });