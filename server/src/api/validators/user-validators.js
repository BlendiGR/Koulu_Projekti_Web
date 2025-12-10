import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {userFields, VALID_ROLES} from "../models/user-model.js";
import {reviewFields} from "../models/review-model.js";

const allowedQueryFields = [...userFields, "skip", "take", "sortBy", "sortOrder"];


/**
 * Validation chain for userId URL parameter.
 */
export const validateUserIdParam = [
    param("userId")
        .isInt({ min: 1 })
        .withMessage("User ID must be a positive integer")
        .toInt(),
];

/**
 * Validation chain for creating a new user.
 */
export const validateCreateUser = [
    body("email").exists().withMessage("email is required").isEmail().withMessage("Must be a valid email").trim().normalizeEmail(),
    body("username").exists().withMessage("username is required").isString().trim().notEmpty().withMessage("username must be a non-empty string").isLength({ max: 50 }).withMessage("username too long"),
    body("password").exists().withMessage("password is required").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    // forbid client-managed or privileged fields
    body("userId").not().exists().withMessage("userId must not be provided"),
    body("createdAt").not().exists().withMessage("createdAt must not be provided"),
    body("isActive").not().exists().withMessage("isActive must not be provided"),
    body("role").not().exists().withMessage("role cannot be set by clients"),
];

/**
 * Validation chain for updating an existing user.
 */
export const validateUpdateUser = [
    body("email").optional().isEmail().withMessage("Must be a valid email").trim().normalizeEmail(),
    body("username").optional().isString().trim().notEmpty().withMessage("Username cannot be empty").isLength({ max: 50 }).withMessage("username too long"),
    body("password").optional().isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),

    // disallow modifying immutable/privileged fields
    body("role").not().exists().withMessage("role cannot be modified"),
    body("userId").not().exists().withMessage("userId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * Validation chain for admin creation of users.
 */
export const validateAdminCreateUser = [
    body("email")
        .exists().withMessage("email is required")
        .isEmail().withMessage("Must be a valid email")
        .trim()
        .normalizeEmail(),
    body("username")
        .exists().withMessage("username is required")
        .isString()
        .trim()
        .notEmpty().withMessage("username must be a non-empty string")
        .isLength({ max: 50 }).withMessage("username too long"),
    body("password")
        .exists().withMessage("password is required")
        .isString()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),

    // admin\-managed fields
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean")
        .toBoolean(),
    body("role")
        .optional()
        .isIn(VALID_ROLES).withMessage(`role must be one of: ${VALID_ROLES.join(" / ")}`),

    // forbid immutable fields
    body("userId").not().exists().withMessage("userId must not be provided"),
    body("createdAt").not().exists().withMessage("createdAt must not be provided"),
];

/**
 * Validation chain for admin updates to users.
 */
export const validateAdminUpdateUser = [
    body("email").optional().isEmail().withMessage("Must be a valid email").trim().normalizeEmail(),
    body("username").optional().isString().trim().notEmpty().withMessage("Username cannot be empty").isLength({ max: 50 }).withMessage("username too long"),
    body("password").optional().isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),
    body("role").optional().isIn(VALID_ROLES).withMessage(`role must be one of: ${VALID_ROLES.join(" / ")}`),

    // still disallow immutable fields
    body("userId").not().exists().withMessage("userId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * Validation chain for user query parameters
 */
export const validateUserQuery = [
    query().custom((_, { req }) => {
        const invalid = Object.keys(req.query).filter((k) => !allowedQueryFields.includes(k));
        if (invalid.length > 0) {
            throw new AppError(
                "Invalid user query parameters",
                400,
                "INVALID_USER_PARAMETERS",
                `Invalid user query params: ${invalid.join(", ")}`
            );
        }
        return true;
    }),
    query("skip").optional().isInt({ min: 0 }).withMessage("skip must be a non-negative integer").toInt(),
    query("take").optional().isInt({ min: 1, max: 100 }).withMessage("take must be an integer between 1 and 100").toInt(),
    query("sortBy").optional().isString().isIn(userFields).withMessage(`sortBy must be one of: ${userFields.join(", ")}`),
    query("sortOrder")
        .optional()
        .customSanitizer((v) => (v == null ? v : String(v).toLowerCase()))
        .isIn(["asc", "desc"]).withMessage("sortOrder must be either 'asc' or 'desc'"),

    query("userId").optional().isInt({ min: 1 }).withMessage("userId must be a positive integer").toInt(),
    query("email").optional().isEmail().withMessage("Email must be a valid email address").trim().normalizeEmail(),
    query("username").optional().isString().withMessage("Username must be a string"),
    query("role").optional().isIn(VALID_ROLES).withMessage(`Role must be: ${VALID_ROLES.join(" / ")}`),
];