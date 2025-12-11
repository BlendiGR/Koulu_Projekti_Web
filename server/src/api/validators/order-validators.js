import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {orderFields, ORDER_STATUSES} from "../models/order-model.js";

const allowedQueryFields = [...orderFields, "orderer", "createdAt", "completedAt", "cost", "skip", "take", "sortBy", "sortOrder"];

/**
 * Validation chain for orderId URL parameter.
 */
export const validateOrderIdParam = [
    param("orderId").isInt({ min: 1 }).withMessage("Order ID must be a positive integer").toInt(),
];

/**
 * TODO: rename fields according to order model
 * Validation chain for creating a new order.
 */
export const validateCreateOrder = [
    body("userId").isInt({ min: 1 }).withMessage("User ID must be a positive integer").toInt(),
    body("destinationAddress").isString().trim().notEmpty().withMessage("destinationAddress must be a non-empty string"),
    body("products").isArray({ min: 1 }).withMessage("products must be a non-empty array"),
    body("products.*").custom((item) => {
        // allow number or string (productId)
        if (typeof item === "number" || typeof item === "string") {
            const id = Number(item);
            if (!Number.isInteger(id) || id < 1) throw new Error("Each product item must be a valid productId (positive integer)");
            return true;
        }
        // allow object { productId, quantity }
        if (item && typeof item === "object") {
            const pid = Number(item.productId);
            const qty = item.quantity === undefined ? 1 : Number(item.quantity);
            if (!Number.isInteger(pid) || pid < 1) throw new Error("product.productId must be a positive integer");
            if (!Number.isInteger(qty) || qty < 1) throw new Error("product.quantity must be a positive integer");
            return true;
        }
        throw new Error("Invalid product item format");
    }),
    body("status").optional().isString().isIn(ORDER_STATUSES).withMessage(`status must be one of: ${ORDER_STATUSES.join(", ")}`),
    body("orderer").optional().isString().trim().withMessage("orderer must be a string"),
    body("cost").not().exists().withMessage("cost must not be provided (computed by server)"),
];

/**
 * TODO: rename fields according to order model
 * Validation chain for updating an existing order.
 */
export const validateUpdateOrder = [
    body("orderId").not().exists().withMessage("orderId cannot be modified"),
    body("userId").not().exists().withMessage("userId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
    body("cost").not().exists().withMessage("cost cannot be modified"),
    body("status").optional().isString().isIn(ORDER_STATUSES).withMessage(`status must be one of: ${ORDER_STATUSES.join(", ")}`),
    body("orderer").optional().isString().trim().withMessage("orderer must be a string"),
    body("completedAt").optional().isISO8601().withMessage("completedAt must be a valid ISO8601 date"),
    // enforce completedAt when status becomes DELIVERED
    // body().custom((_, { req }) => {
    //   if (req.body.status === "DELIVERED" && !req.body.completedAt) {
    //     throw new AppError("completedAt is required when status is DELIVERED", 400, "MISSING_COMPLETED_AT", "completedAt must be provided when status is DELIVERED");
    //   }
    //   return true;
    // }),
];

/**
 * TODO: not actually working yet -> implement correct fields
 * Validation chain for order query parameters
 */
export const validateOrderQuery = [
    query().custom((_, { req }) => {
        const invalid = Object.keys(req.query).filter((k) => !allowedQueryFields.includes(k));
        if (invalid.length > 0) {
            throw new AppError(
                "Invalid order query parameters",
                400,
                "INVALID_ORDER_PARAMETERS",
                `Invalid order query params: ${invalid.join(", ")}`
            );
        }
        return true;
    }),
    query("skip").optional().isInt({ min: 0 }).withMessage("skip must be a non-negative integer").toInt(),
    query("take").optional().isInt({ min: 1, max: 100 }).withMessage("take must be an integer between 1 and 100").toInt(),
    query("sortBy").optional().isString().isIn(orderFields).withMessage(`sortBy must be one of: ${orderFields.join(", ")}`),
    query("sortOrder")
        .optional()
        .customSanitizer((v) => (v == null ? v : String(v).toLowerCase()))
        .isIn(["asc", "desc"]).withMessage("sortOrder must be either 'asc' or 'desc'"),

    query("orderId").optional().isInt({ min: 1 }).withMessage("orderId must be a positive integer").toInt(),
    query("userId").optional().isInt({ min: 1 }).withMessage("userId must be a positive integer").toInt(),
    query("status").optional().isString().isIn(ORDER_STATUSES).withMessage(`status must be one of: ${ORDER_STATUSES.join(", ")}`),
    query("orderer").optional().isString().withMessage("orderer must be a string"),
    query("createdAt").optional().isISO8601().withMessage("createdAt must be a valid ISO8601 date"),
    query("completedAt").optional().isISO8601().withMessage("completedAt must be a valid ISO8601 date"),
    query("cost").optional().isFloat({ min: 0 }).withMessage("cost must be a non-negative number"),
];