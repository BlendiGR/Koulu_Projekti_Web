import {asyncHandler} from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import * as Review from "../models/review-model.js";

/**
 * Get all reviews with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllReviews = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, ...filters} = req.query;

    const reviews = await Review.getReviews(filters, skip, take);

    res.sendSuccess(reviews);
});

/**
 * Get a single review by ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getReviewById = asyncHandler(async (req, res) => {
    const reviewId = Number(req.params.reviewId);

    if (isNaN(reviewId)) {
        throw new AppError("Invalid review ID", 400, "INVALID_REVIEW_ID", "Review ID must be a valid number.");
    }

    const review = await Review.getReviewById(reviewId);

    if (!review) {
        throw new AppError("Review not found", 404, "REVIEW_NOT_FOUND", `No review found with ID ${reviewId}`);
    }

    res.sendSuccess(review);
});