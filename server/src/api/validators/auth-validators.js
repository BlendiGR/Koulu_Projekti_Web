import {body} from "express-validator";

/**
 * Validation chain for login.
 */
export const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Email must be a valid email address"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isString()
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters"),
];