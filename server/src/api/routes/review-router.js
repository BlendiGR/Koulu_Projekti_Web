import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {
    validateReviewIdParam,
    validateCreateReview,
    validateUpdateReview,
    validateReviewQuery
} from "../validators/review-validators.js";

import * as reviewController from "../controllers/review-controller.js";

const reviewRouter = express.Router();

reviewRouter.route("/")
    .get(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateReviewQuery,
        validationErrors,
        reviewController.getAllReviews
    )
    .post(
        authenticateToken,
        ...validateCreateReview,
        validationErrors,
        reviewController.createReview
    );

reviewRouter.route("/:reviewId")
    .get(
        authenticateToken,
        ...validateReviewIdParam,
        validationErrors,
        reviewController.getReviewById
    )
    .put(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateReviewIdParam,
        ...validateUpdateReview,
        validationErrors,
        reviewController.updateReview
    )
    .delete(
        authenticateToken,
        requireRole(["ADMIN"]),
        validateReviewIdParam,
        validationErrors,
        reviewController.deleteReview
    );

export default reviewRouter;