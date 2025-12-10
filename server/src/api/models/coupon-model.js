import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

/**
 * Get all coupons from the database.
 * @param {Object} filter - Filter criteria for querying coupons.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @param {string} sortBy - Field to sort by.
 * @param {string} sortOrder - Sort order, either "asc" or "desc".
 * @returns {Promise<*>}
 */
export const getCoupons = async (filter = {}, skip = 0, take = 100, sortBy, sortOrder = "asc") => {
    return prisma.coupon.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
        orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : undefined,
    });
};

/**
 * Get coupon count.
 * @param {Object} filter - Filter criteria for counting coupons.
 * @returns {Promise<number>}
 */
export const getCouponCount = async (filter = {}) => {
    return prisma.coupon.count({
        where: filter
    });
};

/**
 * Get a coupon by its code.
 * @param {string} code - The code of the coupon to retrieve.
 * @returns {Promise<*>}
 */
export const getCouponByCode = async (code) => {
    return prisma.coupon.findUnique({
        where: { 
            code,
            isActive: true
        }
    });
};

/**
 * Create a new coupon in the database.
 * @param {Object} couponData - The data for the new coupon.
 * @returns {Promise<*>}
 */
export const createCoupon = async (couponData) => {
    try {
        return await prisma.coupon.create({
            data: couponData
        });
    } catch (error) {
        if (error.code === 'P2002') {
            throw new AppError("Coupon code already exists.", 400, "DUPLICATE_COUPON_CODE", "A coupon with this code already exists.");
        }
        throw new AppError("Failed to create coupon.", 500, "COUPON_CREATION_FAILED", error.message);
    }
};

/**
 * Delete a coupon from the database.
 * @param {number} id - The ID of the coupon to delete.
 * @returns {Promise<*>}
 */
export const deleteCoupon = async (id) => {
    try {
        return await prisma.coupon.delete({
            where: { id: Number(id) }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new AppError("Coupon not found.", 404, "COUPON_NOT_FOUND", `No coupon found with ID ${id}`);
        }
        throw new AppError("Failed to delete coupon.", 500, "COUPON_DELETION_FAILED", error.message);
    }
};