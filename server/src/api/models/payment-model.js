import Stripe from "stripe";
import dotenv from "dotenv";
import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a payment intent for the given items.
 * @param {Array} items - List of items (products) to purchase.
 * @param {number|null} couponId - Optional coupon ID to apply discount.
 * @param {string} [currency="eur"] - The currency to use.
 * @returns {Promise<Object>} The created payment intent data.
 */
export const createPaymentIntent = async (items, couponId = null, currency = "eur") => {
    // 1. Normalize and Validate Input
    const products = Array.isArray(items)
        ? items.map(item => {
            // Handle simple ID list [1, 2, 3]
            if (typeof item === "number" || typeof item === "string") {
                return { productId: Number(item), quantity: 1 };
            }
            // Handle object list [{productId: 1, quantity: 2}, {id: 1, quantity: 2}]
            const pId = item?.productId || item?.id;
            return {
                productId: Number(pId),
                quantity: Number(item?.quantity ?? 1)
            };
        }).filter(i => Number.isFinite(i.productId) && Number.isFinite(i.quantity))
        : [];

    if (!products.length) {
        throw new AppError("No items provided", 400, "NO_ITEMS_PROVIDED", "At least one valid item must be provided.");
    }

    // 2. Validate quantities
    for (const it of products) {
        if (!Number.isInteger(it.quantity) || it.quantity < 1) {
            throw new AppError("Invalid quantity.", 400, "INVALID_QUANTITY", `Quantity for product ${it.productId} must be a positive integer.`);
        }
    }

    // 3. Consolidate duplicates
    const consolidated = products.reduce((acc, it) => {
        if (!acc[it.productId]) acc[it.productId] = 0;
        acc[it.productId] += it.quantity;
        return acc;
    }, {});
    const uniqueIds = Object.keys(consolidated).map(id => Number(id));

    // 4. Fetch products from DB to get real prices
    const productsFromDb = await prisma.product.findMany({
        where: { productId: { in: uniqueIds } },
        select: { productId: true, cost: true }
    });

    if (productsFromDb.length !== uniqueIds.length) {
      throw new AppError("One or more products not found.", 400, "PRODUCTS_NOT_FOUND");
    }

    const costMap = {};
    productsFromDb.forEach(p => { costMap[p.productId] = Number(p.cost); });

    // 5. Calculate total amount
    const totalAmount = uniqueIds.reduce((sum, pid) => {
        const qty = consolidated[pid] || 0;
        return sum + (costMap[pid] * qty);
    }, 0);

    let finalAmount = totalAmount;

    if (couponId) {
        const coupon = await prisma.coupon.findUnique({
            where: { id: Number(couponId) }
        });

        if (!coupon) {
            throw new AppError("Coupon not found.", 404, "COUPON_NOT_FOUND", `No coupon found with ID ${couponId}`);
        }

        if (!coupon.isActive) {
            throw new AppError("Coupon is not active.", 400, "COUPON_INACTIVE", "This coupon is no longer valid.");
        }

        const discountPercentage = Number(coupon.discount);
        const discountAmount = (totalAmount * discountPercentage) / 100;
        finalAmount = totalAmount - discountAmount;

        if (finalAmount < 0) finalAmount = 0;
    }

    // 6. Ensure amount is in cents (integer) for Stripe
    const finalAmountInCents = Math.round(finalAmount * 100);

    if (finalAmountInCents <= 0) {
        throw new AppError("Total amount must be greater than 0", 400, "INVALID_AMOUNT");
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalAmountInCents,
            currency: currency,
            payment_method_types: ['card'],
        });

        return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
        console.error("Error creating payment intent:", error);
        throw new AppError("Failed to create payment intent.", 500, "PAYMENT_INTENT_FAILED", error.message);
    }
};
