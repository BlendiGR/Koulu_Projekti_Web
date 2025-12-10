import {asyncHandler} from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import {normalizeSort} from "../../utils/normalize-sort.js";
import * as Review from "../models/review-model.js";

/**
 * Get all reviews with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllReviews = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, sortBy, sortOrder, ...filters} = req.query;

    const skipNum = Number(skip);
    const takeNum = Number(take);

    const normalizedSort = normalizeSort(sortOrder, sortBy) || { sortOrder: undefined, sortField: undefined };

    const reviews = await Review.getReviews(filters, skipNum, takeNum, normalizedSort.sortField, normalizedSort.sortOrder);
    const count = await Review.getReviewCount(filters);

    res.sendSuccess({data: reviews, total: count});
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

/**
 * Get a review along with its associated user.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getReviewWithUser = asyncHandler(async (req, res) => {
    const reviewId = Number(req.params.reviewId);
    const review = await Review.getReviewWithUser(reviewId);

    res.sendSuccess(review);
});

/**
 * Get all reviews by a specific user with pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getReviewsByUser = asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    const {skip = 0, take = 100} = req.query;

    const reviews = await Review.getReviewsByUser(userId, skip, take);

    res.sendSuccess(reviews);
});

/**
 * Create a new review.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createReview = asyncHandler(async (req, res) => {
    const reviewData = { ...req.body };

    // Parse and remove undefined fields
    Object.keys(reviewData).forEach(key => reviewData[key] === undefined && delete reviewData[key]);

    const newReview = await Review.createReview(reviewData);
    res.sendSuccess(newReview, 201);
});

/**
 * Update an existing review.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const updateReview = asyncHandler(async (req, res) => {
    const reviewId = Number(req.params.reviewId);
    const reviewData = { ...req.body };

    // Parse and remove undefined fields
    Object.keys(reviewData).forEach(key => reviewData[key] === undefined && delete reviewData[key]);

    const updatedReview = await Review.updateReview(reviewId, reviewData);
    res.sendSuccess(updatedReview);
});

/**
 * Delete a review by ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const deleteReview = asyncHandler(async (req, res) => {
    const reviewId = Number(req.params.reviewId);

    await Review.deleteReview(reviewId);
    res.sendSuccess(null, 204);
});