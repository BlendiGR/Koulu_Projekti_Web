import { asyncHandler } from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import { getOrderWithProducts } from "../models/order-model.js";
import { sendEmail, getOrderConfirmationEmail, getReviewEmail } from "../models/email-model.js";
import prisma from "../../prisma.js";
import crypto from "crypto";

/**
 * Send order confirmation email (Middleware)
 * @param {Object} req - Express request object
 * @param {Object} req.body.locale - Language locale ('en' or 'fi')
 * @param {Object} res - Express response object
 * @param {Object} res.locals.order - Order object from createOrder controller
 * @param {Function} next - Express next middleware function
 * 
 * @returns {void} Does not send a response (order controller already did)
 * 
 * @example
 * // In order-router.js:
 * orderRouter.post('/', 
 *   authenticateToken,
 *   validateCreateOrder,
 *   orderController.createOrder,  // Creates order & sends response
 *   emailController.sendOrderEmail // Sends email silently
 * );
 * 
 * @note Email failures are logged but do NOT fail the order creation
 */
export const sendOrderEmail = asyncHandler(async (req, res) => {
    // Get order from res.locals (set by createOrder controller)
    // This already includes orderProducts with product details
    const order = res.locals.order;

    console.log(order)
    
    if (!order) {
        console.log('Order data not found in res.locals, skipping email');
        return;
    }

    try {
        if (!order) {
            console.log(`Order #${order.orderId} not found, skipping email`);
            return;
        }

        // Fetch the user separately to get email address
        const user = await prisma.user.findUnique({
            where: { userId: order.userId }
        });

        if (!user || !user.email) {
            console.warn(`No user email for order #${order.orderId}, skipping email`);
            return;
        }

        const orderForEmail = { ...order, user };

        const { subject, html } = getOrderConfirmationEmail(orderForEmail, user.locale);

        await sendEmail({
            to: user.email,
            subject,
            html,
        });

        console.log(`Order confirmation email sent to ${user.email} (Order #${order.orderId})`);

    } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError.message);
    }
});

/**
 * Send review request email
 * @param {Object} req - Express request object
 * @param {string} req.body.email - Recipient email address
 * @param {string} req.body.locale - Language locale ('en' or 'fi')
 * @param {Object} res - Express response object
 */
export const sendReviewEmail = asyncHandler(async (userId) => {
    
    const user = await prisma.user.findUnique({
        where: { 
            userId: userId,
            reviewed: false
        }
    });
    
    if (!user || !user.email) {
        throw new AppError(`No user email for user #${userId}, skipping email`);
    }

    const email = user.email;
    const locale = user.locale || 'en';

    if (!email) {
        throw new AppError('Email address is required', 400);
    }

    try {
        const { subject, html } = getReviewEmail(locale);
        
        await sendEmail({
            to: email,
            subject,
            html,
        });
        
        console.log(`Review email sent to ${email}`);
        
    } catch (emailError) {
        console.error('Failed to send review email:', emailError.message);
    }
});