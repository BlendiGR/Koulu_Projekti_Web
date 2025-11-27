import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {reviewFields} from "../models/review-model.js";

/**
 * Validation chain for reviewId URL parameter.
 */
export const validateReviewIdParam = [
    param("reviewId").isInt({min: 1}).withMessage("Review ID must be an integer"),
];

/**
 * Validation chain for creating a new review.
 */
export const validateCreateReview = [
    body("productId").isInt({min: 1}).withMessage("Product ID must be a valid integer"),
    body("userId").isInt({min: 1}).withMessage("User ID must be a valid integer"),
    body("rating").isInt({min: 1, max: 5}).withMessage("Rating must be an integer between 1 and 5"),
    body("review").isString().withMessage("Comment must be a valid string"),
];

/**
 * Validation chain for updating an existing review.
 */
export const validateUpdateReview = [
    body("rating").optional().isInt({min: 1, max: 5}).withMessage("Rating must be an integer between 1 and 5"),
    body("review").optional().isString().withMessage("Comment must be a valid string"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
    body("reviewId").not().exists().withMessage("reviewId cannot be modified"),
    body("userId").not().exists().withMessage("userId cannot be modified"),
    body("productId").not().exists().withMessage("productId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * Validation chain for review query parameters
 */
export const validateReviewQuery = [
    query().custom((value, {req}) => {
       const allowed = [...reviewFields, "skip", "take"];
       const invalid = Object.keys(req.query).filter(key => !allowed.includes(key));

       if (invalid.length > 0) {
           throw new AppError("Invalid review query parameters", 400, "INVALID_REVIEW_PARAMETERS", `Invalid review query params: ${invalid.join(", ")}`);
       }

       return true;
    }),

    query("skip").optional().isInt({min: 0}).withMessage("skip must be a non-negative integer"),
    query("take").optional().isInt({min: 1, max: 100}).withMessage("take must be a positive integer"),
    query("reviewId").optional().isInt().withMessage("reviewId must be an integer"),
    query("userId").optional().isInt().withMessage("userId must be an integer"),
    query("productId").optional().isInt().withMessage("productId must be an integer"),
    query("rating").optional().isInt({min: 1, max: 5}).withMessage("Rating must be an integer between 1 and 5"),
    query("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
];