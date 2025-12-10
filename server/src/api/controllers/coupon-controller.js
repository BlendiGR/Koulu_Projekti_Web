import { asyncHandler } from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import * as Coupon from "../models/coupon-model.js";

/**
 * Get a coupon by its code.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getCouponByCode = asyncHandler(async (req, res) => {
    const code = req.params.code;

    const coupon = await Coupon.getCouponByCode(code);

    if (!coupon) {
        throw new AppError("Coupon not found.", 404, "COUPON_NOT_FOUND", `No coupon found with code ${code}.`);
    }

    res.sendSuccess(coupon);
});

/**
 * Create a new coupon.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount, isActive } = req.body;
    const couponData = { code, discount, isActive };

    Object.keys(couponData).forEach(key => couponData[key] === undefined && delete couponData[key]);

    const newCoupon = await Coupon.createCoupon(couponData);
    res.sendSuccess(newCoupon, 201);
});

/**
 * Delete a coupon by its ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const deleteCoupon = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new AppError("Invalid coupon ID.", 400, "INVALID_COUPON_ID", "Coupon ID must be a valid number.");
    }

    await Coupon.deleteCoupon(id);
    res.sendSuccess({ message: `Coupon with ID ${id} has been deleted.` });
});
