import prisma from "../../src/prisma.js";
import bcrypt from "bcrypt";

export default async function globalSetup() {
  console.log("Setting up test database...");
  try {
    await seedTestData();
    console.log("Test database seeded successfully");
  } catch (error) {
    console.error("rror setting up test database:", error);
    throw error;
  }
}

async function seedTestData() {
  const password = await bcrypt.hash(process.env.ADMIN_PW || "admin123", 10);
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

  const order = await prisma.order.upsert({
    where: { orderId: 1 },
    update: {},
    create: {
      status: "PREPARING",
      cost: 12.48,
      destinationAddress: "Test Street 123",
      userId: admin.userId,
      phone: "0441234567",
    },
  });

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

  await prisma.announcement.upsert({
    where: { isSingleton: true },
    update: {},
    create: {
      title: "Welcome to Fooder!",
      message: "Thank you for using Fooder. We hope you enjoy your experience!",
      isActive: true,
      isSingleton: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      discount: Number(10).toFixed(2),
      isActive: true,
    }
  });
}
