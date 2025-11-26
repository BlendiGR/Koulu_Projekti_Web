import {asyncHandler} from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import * as Order from "../models/order-model.js";

/**
 * Get all orders with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllOrders = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, ...filters} = req.query;

    const orders = await Order.getOrders(filters, skip, take);

    res.sendSuccess(orders);
});

/**
 * Get orders by status with pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getOrdersByStatus = asyncHandler(async (req, res) => {
    const status = req.params.status;
    const {skip = 0, take = 100} = req.query;

    const orders = await Order.getOrdersByStatusPaginated(status, skip, take);

    res.sendSuccess(orders);
});

/**
 * Get all orders with their products, with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllOrdersWithProducts = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, ...filters} = req.query;

    const orders = await Order.getOrdersWithProducts(filters, skip, take);

    res.sendSuccess(orders);
});

/**
 * Get a single order by ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getOrderById = asyncHandler(async (req, res) => {
    const orderId = Number(req.params.orderId);

    if (isNaN(orderId)) {
        throw new AppError("Invalid order ID", 400, "INVALID_ORDER_ID", "Order ID must be a valid number.");
    }

    const order = await Order.getOrderById(orderId);

    if (!order) {
        throw new AppError("Order not found", 404, "ORDER_NOT_FOUND", `No order found with ID ${orderId}`);
    }

    res.sendSuccess(order);
});