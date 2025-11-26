import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {userFields, VALID_ROLES} from "../models/user-model.js";

/**
 * Validation chain for userId URL parameter.
 */
export const validateUserIdParam = [
    param("userId").isInt({min: 1}).withMessage("User ID must be an integer"),
];

/**
 * Validation chain for creating a new user.
 */
export const validateCreateUser = [
    body("email").notEmpty().isEmail().withMessage("Email must be a valid email address"),
    body("username").notEmpty().isString().withMessage("Username must be a valid string"),
    body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    body("role").optional().isIn(VALID_ROLES).withMessage(`Role must be: ${VALID_ROLES.join(" / ")}`),
];

/**
 * Validation chain for updating an existing user.
 */
export const validateUpdateUser = [
    body("email").optional().isEmail().withMessage("Must be a valid email address"),
    body("username").optional().notEmpty().withMessage("Username cannot be empty"),
    body("password").optional().isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
    body("role").not().exists().withMessage("role cannot be modified"),
    body("userId").not().exists().withMessage("userId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * Validation chain for user query parameters
 */
export const validateUserQuery = [
    query().custom((value, {req}) => {
       const allowed = [...userFields, "skip", "take"];
       const invalid = Object.keys(req.query).filter(key => !allowed.includes(key));

       if (invalid.length > 0) {
           throw new AppError("Invalid user query parameters", 400, "INVALID_USER_PARAMETERS", `Invalid user query params: ${invalid.join(", ")}`);
       }

       return true;
    }),

    query("skip").optional().isInt({min: 0}).withMessage("skip must be a non-negative integer"),
    query("take").optional().isInt({min: 1, max: 100}).withMessage("take must be a positive integer"),
    query("userId").optional().isInt().withMessage("userId must be an integer"),
    query("email").optional().isEmail().withMessage("Email must be a valid email address"),
    query("username").optional().isString().withMessage("Username must be a string"),
    query("role").optional().isIn(VALID_ROLES).withMessage(`Role must be: ${VALID_ROLES.join(" / ")}`),
];