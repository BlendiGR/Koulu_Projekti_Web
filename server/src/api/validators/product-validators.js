import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {productFields, PRODUCT_TYPES} from "../models/product-model.js";
const allowedQueryFields = [...productFields, "skip", "take"];

/**
 * Validation chain for productId URL parameter.
 */
export const validateProductIdParam = [
    param("productId").isInt({ min: 1 }).withMessage("productId must be a positive integer").toInt(),
];

/**
 * Validation chain for creating a new product.
 */
export const validateCreateProduct = [
    body("name").isString().trim().notEmpty().withMessage("name is required"),
    body("type").isString().isIn(PRODUCT_TYPES).withMessage(`type must be one of: ${PRODUCT_TYPES.join(", ")}`),
    body("cost").isFloat({ gt: 0 }).withMessage("cost must be a positive number").toFloat(),
    body("diets").optional().custom((val) => {
        if (Array.isArray(val) || (val && typeof val === "object")) return true;
        throw new AppError("diets must be an array or an object (JSON)", 400, "INVALID_DIETS_FORMAT", "Diets must be provided as an array or JSON object.");
    }),
    body("imageUrl").optional().isURL().withMessage("imageUrl must be a valid URL"),
    body("ingredients").optional().custom((val) => {
        if (Array.isArray(val) || (val && typeof val === "object")) return true;
        throw new AppError("ingredients must be an array or an object (JSON)", 400, "INVALID_INGREDIENTS_FORMAT", "Ingredients must be provided as an array or JSON object.");
    }),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),

    // forbid server-managed fields
    body("productId").not().exists().withMessage("productId must not be provided"),
    body("createdAt").not().exists().withMessage("createdAt must not be provided"),
];

/**
 * Validation chain for updating an existing product.
 */
export const validateUpdateProduct = [
    body("name").optional().isString().trim().notEmpty().withMessage("name must be a non-empty string"),
    body("type").optional().isString().isIn(PRODUCT_TYPES).withMessage(`type must be one of: ${PRODUCT_TYPES.join(", ")}`),
    body("cost").optional().isFloat({ gt: 0 }).withMessage("cost must be a positive number").toFloat(),
    body("diets").optional().custom((val) => {
        if (Array.isArray(val) || (val && typeof val === "object")) return true;
        throw new AppError("diets must be an array or an object (JSON)", 400, "INVALID_DIETS_FORMAT", "Diets must be provided as an array or JSON object.");
    }),
    body("imageUrl").optional().isURL().withMessage("imageUrl must be a valid URL"),
    body("ingredients").optional().custom((val) => {
        if (Array.isArray(val) || (val && typeof val === "object")) return true;
        throw new AppError("ingredients must be an array or an object (JSON)", 400, "INVALID_INGREDIENTS_FORMAT", "Ingredients must be provided as an array or JSON object.");
    }),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),

    // disallow modifying immutable/managed fields
    body("productId").not().exists().withMessage("productId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * Validation chain for querying products with pagination.
 */
export const validateProductQuery = [
    query().custom((_, { req }) => {
        const invalid = Object.keys(req.query).filter((k) => !allowedQueryFields.includes(k));
        if (invalid.length > 0) {
            throw new AppError(
                "Invalid product query parameters",
                400,
                "INVALID_PRODUCT_PARAMETERS",
                `Invalid product query params: ${invalid.join(", ")}`
            );
        }
        return true;
    }),
    query("skip").optional().isInt({ min: 0 }).withMessage("skip must be a non-negative integer").toInt(),
    query("take").optional().isInt({ min: 1, max: 100 }).withMessage("take must be an integer between 1 and 100").toInt(),
    query("productId").optional().isInt({ min: 1 }).withMessage("productId must be a positive integer").toInt(),
    query("name").optional().isString().withMessage("name must be a string"),
    query("type").optional().isString().isIn(PRODUCT_TYPES).withMessage(`type must be one of: ${PRODUCT_TYPES.join(", ")}`),
    query("cost").optional().isFloat({ min: 0 }).withMessage("cost must be a non-negative number").toFloat(),
    query("isActive").optional().isBoolean().withMessage("isActive must be a boolean").toBoolean(),
];