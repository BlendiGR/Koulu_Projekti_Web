import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

/**
 * Valid product types.
 * @type {string[]}
 */
export const PRODUCT_TYPES = ["FOOD", "DRINK", "SIDE"];


/**
 * Valid query params for the product model.
 * Used in validators/product-validators.js
 * @type {string[]}
 */
export const productFields = [
    "productId",
    "name",
    "description",
    "cost",
    "type",
    "isActive"
];

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
    try {
        if (!PRODUCT_TYPES.includes(productData.type)) {
            throw new AppError("Invalid product type.", 400, "INVALID_PRODUCT_TYPE", `Type must be one of: ${PRODUCT_TYPES.join(", ")}.`);
        }
        return await prisma.product.create({
            data: productData
        });
    } catch (error) {
        throw new AppError("Failed to create product.", 500, "PRODUCT_CREATION_FAILED", error.message);
    }
};

/**
 * Update an existing product in the database.
 * @param {number} productId - The ID of the product to update.
 * @param {Object} updateData - The data to update the product with.
 * @returns {Promise<*>}
 */
export const updateProduct = async (productId, updateData) => {
    try {
        if (updateData.type && !PRODUCT_TYPES.includes(updateData.type)) {
            throw new AppError("Invalid product type.", 400, "INVALID_PRODUCT_TYPE", `Type must be one of: ${PRODUCT_TYPES.join(", ")}.`);
        }
        return await prisma.product.update({
            where: { productId: Number(productId) },
            data: updateData
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError("Product not found.", 404, "PRODUCT_NOT_FOUND", `No product found with ID ${productId}`);
        }
        throw new AppError("Failed to update product.", 500, "PRODUCT_UPDATE_FAILED", error.message);
    }
};

/**
 * Delete a product from the database.
 * @param {number} productId - The ID of the product to delete.
 * @returns {Promise<*>}
 */
export const deleteProduct = async (productId) => {
    try {
        return await prisma.product.delete({
            where: { productId: Number(productId) }
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError("Product not found.", 404, "PRODUCT_NOT_FOUND", `No product found with ID ${productId}`);
        }
        throw new AppError("Failed to delete product.", 500, "PRODUCT_DELETION_FAILED", error.message);
    }
};