import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

/**
 * Valid query params for the review model.
 * Used in validators/review-validators.js
 * @type {string[]}
 */
export const reviewFields = [
    "reviewId",
    "rating",
    "reviewer",
    "review",
    "isActive"
];

/**
 * Get all reviews from the database.
 * @param {Object} filter - Filter criteria for querying reviews.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @param {string} sortBy - Field to sort by.
 * @param {string} sortOrder - Sort order, either "asc" or "desc".
 * @returns {Promise<*>}
 */
export const getReviews = async (filter = {}, skip = 0, take = 100, sortBy, sortOrder = "asc") => {
    return prisma.review.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
        orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : undefined,
    });
};

/**
 * Get review count.
 * @param {Object} filter - Filter criteria for counting reviews.
 * @returns {Promise<number>}
 */
export const getReviewCount = async (filter = {}) => {
    return prisma.review.count({
        where: filter,
    });
};

/**
 * Get a review by its ID.
 * @param {number} reviewId - The ID of the review to retrieve.
 * @returns {Promise<*>}
 */
export const getReviewById = async (reviewId) => {
    return prisma.review.findUnique({
        where: { reviewId: Number(reviewId) },
    });
};

/**
 * Create a new review.
 * @param {Object} reviewData - Data for the new review.
 * @param {number} userId - ID of the user creating the review.
 * @returns {Promise<*>}
 */
export const createReview = async (reviewData, userId) => {
    const newReview = await prisma.review.create({
        data: reviewData,
    });

    await prisma.user.update({
        where: { userId: userId },
        data: { reviewed: true }
    });

    return newReview;
};

/**
 * Update an existing review.
 * @param {number} reviewId - The ID of the review to update.
 * @param {Object} updateData - Data to update the review with.
 * @returns {Promise<*>}
 */
export const updateReview = async (reviewId, updateData) => {
    try {
        return await prisma.review.update({
            where: { reviewId: Number(reviewId) },
            data: updateData,
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError("Review not found.", 404, "REVIEW_NOT_FOUND", `No review found with ID ${reviewId}`);
        }
        throw new AppError("Failed to update review.", 500, "REVIEW_UPDATE_FAILED", error.message);
    }
};

/**
 * Delete a review.
 * @param {number} reviewId - The ID of the review to delete.
 * @returns {Promise<*>}
 */
export const deleteReview = async (reviewId) => {
    try {
        return await prisma.review.delete({
            where: { reviewId: Number(reviewId) },
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError("Review not found.", 404, "REVIEW_NOT_FOUND", `No review found with ID ${reviewId}`);
        }
        throw new AppError("Failed to delete review.", 500, "REVIEW_DELETION_FAILED", error.message);
    }
};