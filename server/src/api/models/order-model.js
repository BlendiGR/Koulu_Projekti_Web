import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

/**
 * Order statuses.
 * @type {string[]}
 */
export const ORDER_STATUSES = ["PREPARING", "DELIVERING", "DELIVERED"];

/**
 * Get all orders from the database.
 * @param {Object} filter - Filter criteria for querying orders.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @returns {Promise<*>}
 */
export const getOrders = async (filter = {}, skip = 0, take = 100) => {
    return prisma.order.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
    });
};

/**
 * Get all orders with their products.
 * @param {Object} filter - Filter criteria for querying orders.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @returns {Promise<*>}
 */
export const getOrdersWithProducts = async (filter = {}, skip = 0, take = 100) => {
    return prisma.order.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        },
    });
};

/**
 * Get orders by status.
 * @param {string} status - The status of the orders to retrieve.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @returns {Promise<*>}
 */
export const getOrdersByStatusPaginated = async (status, skip = 0, take = 100) => {
    if (!ORDER_STATUSES.includes(status)) {
        throw new AppError("Invalid order status.", 400, "INVALID_ORDER_STATUS", `Status must be one of: ${ORDER_STATUSES.join(", ")}.`);
    }

    return prisma.order.findMany({
        where: { status: status },
        skip: Number(skip),
        take: Number(take),
    });
};

/**
 * Get an order by its ID.
 * @param {number} orderId - The ID of the order to retrieve.
 * @returns {Promise<*>}
 */
export const getOrderById = async (orderId) => {
    return prisma.order.findUnique({
        where: { orderId: Number(orderId) }
    });
};

/**
 * Get orders for a specific user.
 * @param {number} userId - The ID of the user whose orders to retrieve.
 * @returns {Promise<*>}
 */
export const getOrdersByUserId = async (userId) => {
    return prisma.order.findMany({
        where: { userId: Number(userId) }
    });
};

/**
 * Get order with its products.
 * @param {number} orderId - The ID of the order to retrieve.
 * @returns {Promise<*>}
 */
export const getOrderWithProducts = async (orderId) => {
    return prisma.order.findUnique({
        where: { orderId: Number(orderId) },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        },
    });
}

/**
 * Get order by its status, including its products.
 * @param {string} status - The status of the order to retrieve.
 * @returns {Promise<*>}
 */
export const getOrdersByStatusWithProducts = async (status) => {
    return prisma.order.findMany({
        where: { status: status },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        },
    });
};

/**
 * Create a new order in the database.
 * @param {Object} orderData - The data for the new order.
 * @returns {Promise<*>}
 */
export const createOrder = async (orderData) => {
    try {
        return await prisma.order.create({
            data: orderData
        });
    } catch (error) {
        throw new AppError("Failed to create order.", 500, "ORDER_CREATION_FAILED", error.message);
    }
};

/**
 * Update an existing order in the database.
 * @param {number} orderId - The ID of the order to update.
 * @param {Object} updateData - The data to update the order with.
 * @returns {Promise<*>}
 */
export const updateOrder = async (orderId, updateData) => {
    try {
        return await prisma.order.update({
            where: { orderId: Number(orderId) },
            data: updateData
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError("Order not found.", 404, "ORDER_NOT_FOUND", `No order found with ID ${orderId}`);
        }
        throw new AppError("Failed to update order.", 500, "ORDER_UPDATE_FAILED", error.message);
    }
};

/**
 * Delete an order from the database.
 * @param {number} orderId - The ID of the order to delete.
 * @returns {Promise<*>}
 */
export const deleteOrder = async (orderId) => {
    try {
        return await prisma.order.delete({
            where: { orderId: Number(orderId) }
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError("Order not found.", 404, "ORDER_NOT_FOUND", `No order found with ID ${orderId}`);
        }
        throw new AppError("Failed to delete order.", 500, "ORDER_DELETION_FAILED", error.message);
    }
};