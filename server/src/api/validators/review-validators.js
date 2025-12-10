import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {reviewFields} from "../models/review-model.js";

const allowedQueryFields = [...reviewFields, "skip", "take", "sortBy", "sortOrder"];

/**
 * Validation chain for reviewId URL parameter.
 */
export const validateReviewIdParam = [
    param("reviewId").isInt({ min: 1 }).withMessage("reviewId must be a positive integer").toInt(),
];

/**
 * Validation chain for creating a new review.
 */
export const validateCreateReview = [
    body("rating").isInt({ min: 1, max: 5 }).withMessage("rating must be an integer between 1 and 5").toInt(),
    body("reviewer").isString().trim().notEmpty().withMessage("reviewer must be a non-empty string")
        .isLength({ max: 100 }).withMessage("reviewer must not exceed 100 characters"),
    body("review").isString().trim().notEmpty().withMessage("review must be a non-empty string")
        .isLength({ max: 2000 }).withMessage("review must not exceed 2000 characters"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),

    // forbid server-managed / immutable fields on create
    body("reviewId").not().exists().withMessage("reviewId must not be provided"),
    body("createdAt").not().exists().withMessage("createdAt must not be provided"),
];

/**
 * Validation chain for updating an existing review.
 */
export const validateUpdateReview = [
    body("rating").optional().isInt({ min: 1, max: 5 }).withMessage("rating must be an integer between 1 and 5").toInt(),
    body("reviewer").optional().isString().trim().notEmpty().withMessage("reviewer must be a non-empty string")
        .isLength({ max: 100 }).withMessage("reviewer must not exceed 100 characters"),
    body("review").optional().isString().trim().notEmpty().withMessage("review must be a non-empty string")
        .isLength({ max: 2000 }).withMessage("review must not exceed 2000 characters"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),

    // disallow modifying immutable/relational fields
    body("reviewId").not().exists().withMessage("reviewId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * Validation chain for review query parameters
 */
export const validateReviewQuery = [
    query().custom((_, { req }) => {
        const invalid = Object.keys(req.query).filter((k) => !allowedQueryFields.includes(k));
        if (invalid.length > 0) {
            throw new AppError(
                "Invalid review query parameters",
                400,
                "INVALID_REVIEW_PARAMETERS",
                `Invalid review query params: ${invalid.join(", ")}`
            );
        }
        return true;
    }),

    // pagination
    query("skip").optional().isInt({ min: 0 }).withMessage("skip must be a non-negative integer").toInt(),
    query("take").optional().isInt({ min: 1, max: 100 }).withMessage("take must be an integer between 1 and 100").toInt(),
    query("sortBy").optional().isString().isIn(reviewFields).withMessage(`sortBy must be one of: ${reviewFields.join(", ")}`),
    query("sortOrder")
        .optional()
        .customSanitizer((v) => (v == null ? v : String(v).toLowerCase()))
        .isIn(["asc", "desc"]).withMessage("sortOrder must be either 'asc' or 'desc'"),

    // filters
    query("reviewId").optional().isInt({ min: 1 }).withMessage("reviewId must be a positive integer").toInt(),
    query("rating").optional().isInt({ min: 1, max: 5 }).withMessage("rating must be an integer between 1 and 5").toInt(),
    query("reviewer").optional().isString().withMessage("reviewer must be a string for filtering (partial match supported by model)"),
    query("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),
    query("review").optional().isString().withMessage("review must be a string for filtering (partial match supported by model)"),
];