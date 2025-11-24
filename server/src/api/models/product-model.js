import prisma from "../../prisma.js";

/**
 * Get all products from the database.
 * @param {Object} filter - Filter criteria for querying products.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @returns {Promise<*>}
 */
export const getProducts = async (filter = {}, skip = 0, take = 100) => {
    return prisma.product.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
    });
};

/**
 * Get a product by its ID.
 * @param {number} productId - The ID of the product to retrieve.
 * @returns {Promise<*>}
 */
export const getProductById = async (productId) => {
    return prisma.product.findUnique({
        where: { productId: Number(productId) }
    });
};

/**
 * Create a new product in the database.
 * @param {Object} productData - The data for the new product.
 * @returns {Promise<*>}
 */
export const createProduct = async (productData) => {
    return prisma.product.create({
        data: productData
    });
};

/**
 * Update an existing product in the database.
 * @param {number} productId - The ID of the product to update.
 * @param {Object} updateData - The data to update the product with.
 * @returns {Promise<*>}
 */
export const updateProduct = async (productId, updateData) => {
    try {
        return prisma.product.update({
            where: { productId: Number(productId) },
            data: updateData
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        throw error;
    }
};

/**
 * Delete a product from the database.
 * @param {number} productId - The ID of the product to delete.
 * @returns {Promise<*>}
 */
export const deleteProduct = async (productId) => {
    try {
        return prisma.product.delete({
            where: { productId: Number(productId) }
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new Error(`Product with ID ${productId} does not exist.`);
        }
        throw error;
    }
};