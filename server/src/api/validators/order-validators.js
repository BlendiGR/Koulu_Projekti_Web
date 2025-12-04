import {body, query, param} from "express-validator";
import AppError from "../../utils/AppError.js";

import {orderFields, ORDER_STATUSES} from "../models/order-model.js";

/**
 * Validation chain for orderId URL parameter.
 */
export const validateOrderIdParam = [
    param("orderId").isInt({min: 1}).withMessage("Order ID must be an integer"),
];

/**
 * TODO: rename fields according to order model
 * Validation chain for creating a new order.
 */
export const validateCreateOrder = [
    body("userId").isInt({min: 1}).withMessage("User ID must be a valid integer"),
    body("cost").isFloat({min: 0}).withMessage("Total amount must be a valid number"),
    body("destinationAddress").isString().withMessage("Destination address must be a valid string"),
    body("status").isString().withMessage("Status must be a valid string"),
];

/**
 * TODO: rename fields according to order model
 * Validation chain for updating an existing order.
 */
export const validateUpdateOrder = [
    body("status").optional().isString().isIn(ORDER_STATUSES).withMessage("Status must be a valid string"),
    body("cost").optional().isFloat({min: 0}).withMessage("Total amount must be a valid number"),
    body("orderId").not().exists().withMessage("orderId cannot be modified"),
    body("userId").not().exists().withMessage("userId cannot be modified"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
];

/**
 * TODO: not actually working yet -> implement correct fields
 * Validation chain for order query parameters
 */
export const validateOrderQuery = [
    query().custom((value, {req}) => {
       const allowed = [...orderFields, "skip", "take"];
       const invalid = Object.keys(req.query).filter(key => !allowed.includes(key));

       if (invalid.length > 0) {
           throw new AppError("Invalid order query parameters", 400, "INVALID_ORDER_PARAMETERS", `Invalid order query params: ${invalid.join(", ")}`);
       }

       return true;
    }),

    query("skip").optional().isInt({min: 0}).withMessage("skip must be a non-negative integer"),
    query("take").optional().isInt({min: 1, max: 100}).withMessage("take must be a positive integer"),
    query("orderId").optional().isInt().withMessage("orderId must be an integer"),
    query("userId").optional().isInt().withMessage("userId must be an integer"),
    query("status").optional().isString().withMessage("status must be a string"),
    query("totalAmount").optional().isFloat({min: 0}).withMessage("totalAmount must be a valid number"),
];