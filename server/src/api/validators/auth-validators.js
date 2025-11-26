import {body} from "express-validator";

/**
 * Validation chain for login.
 */
export const validateLogin = [
    body("email").isEmail().withMessage("Must be a valid email address"),
    body("password").isString().isLength({min: 6}), // TODO change to higher
];