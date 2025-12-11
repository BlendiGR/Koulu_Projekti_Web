import prisma from "../src/prisma.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const main = async () => {
  console.log("Seeding...");

  // 1. Create the initial admin user
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

  // 7. Seed reviews
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        review: "Best burger I have had in a long time. Juicy, fresh, and perfectly seasoned.",
        isActive: true,
        reviewer: "Laura Nieminen",
      },
      {
        rating: 4,
        review: "Fries were crispy and hot, could have used a bit more salt but still great.",
        isActive: true,
        reviewer: "Antti Korhonen",
      },
      {
        rating: 3,
        review: "Food was okay, delivery took a bit longer than expected.",
        isActive: true,
        reviewer: "Sanni Virtanen",
      },
      {
        rating: 5,
        review: "Loved the nuggets! Crunchy outside and tender inside. Will order again.",
        isActive: true,
        reviewer: "Jukka Mäkinen",
      },
      {
        rating: 4,
        review: "Nice portion size for the price. Burger bun was really soft and fresh.",
        isActive: true,
        reviewer: "Elina Salmi",
      },
      {
        rating: 2,
        review: "Fries were a bit soggy this time, maybe an off day in the kitchen.",
        isActive: true,
        reviewer: "Matti Lehtonen",
      },
      {
        rating: 5,
        review: "Great taste and fast delivery. Everything arrived still warm.",
        isActive: true,
        reviewer: "Riikka Laine",
      },
      {
        rating: 4,
        review: "Good variety of options and the nuggets were especially tasty.",
        isActive: true,
        reviewer: "Oskari Ranta",
      },
      {
        rating: 3,
        review: "Burger was decent, but I would have liked more sauce.",
        isActive: true,
        reviewer: "Hanna Koskinen",
      },
      {
        rating: 5,
        review: "Absolutely delicious! Fries and burger combo was perfect.",
        isActive: true,
        reviewer: "Ville Saarinen",
      },
      {
        rating: 4,
        review: "Tasty food and polite courier. Packaging kept everything neat.",
        isActive: true,
        reviewer: "Tiina Aalto",
      },
      {
        rating: 1,
        review: "Order arrived cold and late. Hoping this improves next time.",
        isActive: true,
        reviewer: "Petri Hämäläinen",
      },
      {
        rating: 5,
        review: "Super friendly service and the food quality is consistently high.",
        isActive: true,
        reviewer: "Anni Peltola",
      },
      {
        rating: 4,
        review: "Nice seasoning on the fries, not too salty, just right.",
        isActive: true,
        reviewer: "Sampo Heikkinen",
      },
      {
        rating: 5,
        review: "My go-to place for a quick and tasty burger meal. Highly recommended.",
        isActive: true,
        reviewer: "Katja Jokinen",
      },
    ],
    skipDuplicates: true,
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