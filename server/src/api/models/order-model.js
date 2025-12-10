import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

/**
 * Valid query params for the order model.
 * Used in validators/order-validators.js
 * @type {string[]}
 */
export const orderFields = [
    "orderId",
    "userId",
    "status",
];

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
    const { products, couponId, ...orderFields} = orderData;

    // normalize input: allow [1, "2", {productId:3, quantity:2}, ...]
    const items = Array.isArray(products)
        ? products.map(item => {
            if (typeof item === "number" || typeof item === "string") {
                return { productId: Number(item), quantity: 1 };
            }
            return {
                productId: Number(item?.productId),
                quantity: Number(item?.quantity ?? 1)
            };
        }).filter(i => Number.isFinite(i.productId) && Number.isFinite(i.quantity))
        : [];

    if (!items.length) {
        throw new AppError("No products provided", 400, "NO_PRODUCTS_PROVIDED", "At least one valid productId must be provided.");
    }

    // validate quantities (must be positive integers)
    for (const it of items) {
        if (!Number.isInteger(it.quantity) || it.quantity < 1) {
            throw new AppError("Invalid quantity.", 400, "INVALID_QUANTITY", `Quantity for product ${it.productId} must be a positive integer.`);
        }
    }

    // allow duplicates (multiple lines for same product are combined)
    const consolidated = items.reduce((acc, it) => {
        if (!acc[it.productId]) acc[it.productId] = 0;
        acc[it.productId] += it.quantity;
        return acc;
    }, {});
    const uniqueIds = Object.keys(consolidated).map(id => Number(id));

    // fetch products and ensure existence
    const productsFromDb = await prisma.product.findMany({
        where: { productId: { in: uniqueIds } },
        select: { productId: true, cost: true }
    });

    if (productsFromDb.length !== uniqueIds.length) {
        throw new AppError("One or more products not found.", 400, "PRODUCTS_NOT_FOUND");
    }

    const costMap = {};
    productsFromDb.forEach(p => { costMap[p.productId] = Number(p.cost); });

    const totalCost = uniqueIds.reduce((sum, pid) => {
        const qty = consolidated[pid] || 0;
        return sum + (costMap[pid] * qty);
    }, 0);

    // Handle coupon validation and discount calculation
    let finalCost = totalCost;
    let appliedDiscount = 0;

    if (couponId) {
        const coupon = await prisma.coupon.findUnique({
            where: { id: Number(couponId) }
        });

        if (!coupon) {
            throw new AppError("Coupon not found.", 404, "COUPON_NOT_FOUND", `No coupon found with ID ${couponId}`);
        }

        if (!coupon.isActive) {
            throw new AppError("Coupon is not active.", 400, "COUPON_INACTIVE", "This coupon is no longer valid.");
        }

        const discountPercentage = Number(coupon.discount);
        appliedDiscount = (totalCost * discountPercentage) / 100;
        finalCost = totalCost - appliedDiscount;

        if (finalCost < 0) finalCost = 0;
    }

    try {
        return await prisma.order.create({
            data: {
                ...orderFields,
                ...(orderFields.userId !== undefined ? { userId: Number(orderFields.userId) } : {}),
                cost: String(finalCost),
                orderProducts: {
                    create: uniqueIds.map(productId => ({
                        quantity: consolidated[productId],
                        product: { connect: { productId } }
                    }))
                },
            },
            include: {
                orderProducts: {
                    include: { product: true }
                }
            }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new AppError("One or more products not found.", 400, "PRODUCTS_NOT_FOUND", error.message);
        }
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