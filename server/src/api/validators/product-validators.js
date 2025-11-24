import {body, query} from "express-validator";

/**
 * Validation chain for creating a new product.
 */
export const validateCreateProduct = [
    body("name").isString().isLength({min: 1}).withMessage("Product name is required"),
    body("type").isString().isLength({min: 1}).withMessage("Product type is required"),
    body("cost").isFloat({gt: 0}).withMessage("Cost must be a positive number"),
    body("diets").optional().isArray().withMessage("Diets must be an array"),
    body("imageUrl").optional().isURL().withMessage("Image URL must be a valid URL"),
    body("ingredients").optional().isArray().withMessage("Ingredients must be an array"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
];

/**
 * Validation chain for updating an existing product.
 */
export const validateUpdateProduct = [
    body("name").optional().isString().isLength({min: 1}).withMessage("Product name must be a non-empty string"),
    body("type").optional().isString().isLength({min: 1}).withMessage("Product type must be a non-empty string"),
    body("cost").optional().isFloat({gt: 0}).withMessage("Cost must be a positive number"),
    body("diets").optional().isArray().withMessage("Diets must be an array"),
    body("imageUrl").optional().isURL().withMessage("Image URL must be a valid URL"),
    body("ingredients").optional().isArray().withMessage("Ingredients must be an array"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
];

/**
 * Validation chain for querying products with pagination.
 */
export const validateProductQuery = [
    query("skip").optional().isInt({min: 0}).withMessage("skip must be a non-negative integer"),
    query("take").optional().isInt({min: 1, max: 100}).withMessage("take must be a positive integer"),
];