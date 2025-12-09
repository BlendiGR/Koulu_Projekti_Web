import Stripe from "stripe";
import dotenv from "dotenv";
import prisma from "../../prisma.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { items, currency } = req.body;

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, error: "No items provided" });
    }

    // 1. Fetch products from DB to get real prices
    const productIds = items.map(item => Number(item.productId || item.id));
    const products = await prisma.product.findMany({
        where: {
            productId: { in: productIds }
        }
    });

    // 2. Calculate total amount
    let totalAmount = 0;
    items.forEach(cartItem => {
        const product = products.find(p => p.productId === Number(cartItem.productId || cartItem.id));
        if (product) {
            // Price is decimal in DB, handle appropriately. 
            // Assuming simplified case where we sum up.
            // quantity from cart, cost from DB.
            totalAmount += Number(product.cost) * (cartItem.quantity || 1);
        }
    });

    // Ensure amount is in cents (integer) for Stripe
    // Rounding to avoid floating point issues
    const finalAmount = Math.round(totalAmount * 100);

    if (finalAmount <= 0) {
         return res.status(400).json({ success: false, error: "Total amount must be greater than 0" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: currency || "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      data: { 
        clientSecret: paymentIntent.client_secret 
      }
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
