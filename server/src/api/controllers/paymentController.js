import { asyncHandler } from "../../utils/async-handler.js";
import * as Payment from "../models/payment-model.js";

/**
 * Create a payment intent.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createPaymentIntent = asyncHandler(async (req, res) => {
    const { items, couponId, currency } = req.body;

    const result = await Payment.createPaymentIntent(items, couponId, currency);

    res.sendSuccess(result);
});
