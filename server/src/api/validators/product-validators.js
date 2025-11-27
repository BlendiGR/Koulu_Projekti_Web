import {body, query} from "express-validator";
import {productFields} from "../models/product-model.js";
import AppError from "../../utils/AppError.js";

/**
 * Validation chain for productId URL parameter.
 */
export const validateProductIdParam = [
    query("productId").isInt({min: 1}).withMessage("Product ID must be an integer"),
];

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
    query().custom((value, {req}) => {
         const allowed = [...productFields, "skip", "take"];
        const invalid = Object.keys(req.query).filter(key => !allowed.includes(key));

        if (invalid.length > 0) {
            throw new AppError("Invalid product query parameters", 400, "INVALID_PRODUCT_PARAMETERS", `Invalid product query params: ${invalid.join(", ")}`);
        }

        return true;
    }),

    query("skip").optional().isInt({min: 0}).withMessage("skip must be a non-negative integer"),
    query("take").optional().isInt({min: 1, max: 100}).withMessage("take must be a positive integer"),
    query("productId").optional().isInt().withMessage("productId must be an integer"),
    query("name").optional().isString().withMessage("name must be a string"),
    query("type").optional().isString().withMessage("type must be a string"),
    query("isAvailable").optional().isBoolean().withMessage("isAvailable must be a boolean"),

];