import prisma from "../src/prisma.js";
import bcrypt from "bcrypt";

const main = async () => {
  console.log("Seeding...");

  // 1. Create the initial admin user
  const password = await bcrypt.hash("adminpassword", 10);
  const user = await prisma.user.create({
    data: {
      username: "admin",
      role: "ADMIN",
      email: "admin1@fooder.fi",
      password: password,
    },
  });

  // 2. Create products
  const product1 = await prisma.product.create({
    data: {
      type: "FOOD",
      name: "Crispy Fries",
      cost: 3.99,
      diets: { vegetarian: true, vegan: true },
      imageUrl: "src/assets/images/French Fries.png",
      ingredients: { list: ["Potato", "Oil", "Salt", "Pepper"] },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      type: "FOOD",
      name: "Chicken Nuggets",
      cost: 6.99,
      diets: { vegetarian: false, vegan: false },
      imageUrl: "src/assets/images/Chicken Nuggets.png",
      ingredients: { list: ["Chicken", "Breading", "Salt", "Pepper"] },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      type: "FOOD",
      name: "Cheese Burger",
      cost: 8.99,
      diets: { vegetarian: false, vegan: false },
      imageUrl: "src/assets/images/Cheese Burger.png",
      ingredients: { list: ["Beef", "Cheddar", "Ketchup", "Mustard", "Mayonnaise", "Lettuce", "Tomato", "Onion"] },
    },
  });

  // 3. Create an order (matching your enum)
  const order = await prisma.order.create({
    data: {
      status: "PREPARING",
      cost: 12.48,
      destinationAddress: "Test Street 123",
      userId: user.userId,
    },
  });

  // 4. Attach products to the order
  await prisma.orderProduct.create({
    data: {
      orderId: order.orderId,
      productId: product1.productId,
    },
  });

  await prisma.orderProduct.create({
    data: {
      orderId: order.orderId,
      productId: product2.productId,
    },
  });

  // 5. Seed announcement (no coupon relation)
  await prisma.announcement.create({
    data: {
      title: "Welcome to Fooder!",
      message: "Thank you for using Fooder. We hope you enjoy your experience!",
      isActive: true,
      isSingleton: true,
    },
  });

  // 6. Seed a coupon (standalone)
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      discount: 10.0,
      isActive: true,
    },
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