import prisma from "../src/prisma.js";

const main = async () => {
  console.log("Seeding...");

  // 1. Create the initial admin user
  const user = await prisma.user.create({
    data: {
      username: "sysadmin",
      role: "admin",
      email: "admin@fooder.fi",
      password: "hashedpassword123",
    },
  });

  // 2. Create products
  const product1 = await prisma.product.create({
    data: {
      type: "FOOD",
      name: "Burger",
      cost: 9.99,
      diets: { vegan: false },
      imageUrl: "burger.jpg",
      ingredients: { list: ["bun", "beef", "cheese"] },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      type: "DRINK",
      name: "Cola",
      cost: 2.49,
      diets: { sugarFree: false },
      imageUrl: "cola.jpg",
      ingredients: { list: ["water", "sugar"] },
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

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });