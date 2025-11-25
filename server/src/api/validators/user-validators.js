import {body, query} from "express-validator";

/**
 * Validation chain for creating a new user.
 */
export const validateCreateUser = [
    body("email").isEmail().withMessage("Must be a valid email address"),
    body("username").notEmpty().withMessage("Must be a valid email address"),
    body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
];

/**
 * Validation chain for updating an existing user.
 */
export const validateUpdateUser = [
    body("email").optional().isEmail().withMessage("Must be a valid email address"),
    body("username").optional().notEmpty().withMessage("Username cannot be empty"),
    body("password").optional().isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
];

/**
 * Validation chain for user query parameters (pagination).
 */
export const validateUserQuery = [
    query("skip").optional().isInt({min: 0}).withMessage("skip must be a non-negative integer"),
    query("take").optional().isInt({min: 1, max: 100}).withMessage("take must be a positive integer"),
];