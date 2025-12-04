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
    const order = await Order.getOrderById(orderId);

    if (!order) {
        throw new AppError("Order not found", 404, "ORDER_NOT_FOUND", `No order found with ID ${orderId}`);
    }

    res.sendSuccess(order);
});

/**
 * Get orders by associated user
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getOrdersByUserId = asyncHandler(async (req, res) => {
   const userId = Number(req.params.userId);
   const orders = await Order.getOrdersByUserId(userId);

   res.sendSuccess(orders);
});

/**
 * Create a new order.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createOrder = asyncHandler(async (req, res) => {
    const orderData = { ...req.body };

    // Parse and remove undefined fields
    Object.keys(orderData).forEach(key => orderData[key] === undefined && delete orderData[key]);

    const newOrder = await Order.createOrder(orderData);
    res.sendSuccess(newOrder, 201);
});

/**
 * Update an existing order.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const updateOrder = asyncHandler(async (req, res) => {
    const orderId = Number(req.params.orderId);
    const updateData = { ...req.body };

    // Parse and remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedOrder = await Order.updateOrder(orderId, updateData);
    res.sendSuccess(updatedOrder);
});

/**
 * Delete an order by ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const deleteOrder = asyncHandler(async (req, res) => {
    const orderId = Number(req.params.orderId);

    await Order.deleteOrder(orderId);
    res.sendSuccess(null, 204);
});