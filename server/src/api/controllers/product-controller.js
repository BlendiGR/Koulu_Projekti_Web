import {asyncHandler} from "../utils/async-handler.js";
import AppError from "../utils/AppError.js";
import * as Product from "../models/product-model.js";

/**
 * Get all products with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllProducts = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, ...filters} = req.query;
    if (filters.productId) filters.productId = Number(filters.productId);

    const skipNum = Number(skip);
    const takeNum = Number(take);

    if (isNaN(skipNum) || isNaN(takeNum)) {
        throw new AppError("Invalid pagination parameters.", 400, "INVALID_PAGINATION", "Skip and take must be valid numbers.");
    }

    const products = await Product.getProducts(filters, skipNum, takeNum);

    res.sendSuccess(products);
});

/**
 * Get a single product by its ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getProductById = asyncHandler(async (req, res) => {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
        throw new AppError("Invalid product ID.", 400, "INVALID_PRODUCT_ID", "Product ID must be a valid number.");
    }

    const product = await Product.getProductById(productId);

    if (!product) {
        throw new AppError("Product not found.", 404, "PRODUCT_NOT_FOUND", `No product found with ID ${productId}.`);
    }

    res.sendSuccess(product);
});

/**
 * Create a new product.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createProduct = asyncHandler(async (req, res) => {
    const {type, name, cost, diets, imageUrl, ingredients, isActive} = req.body;
    const productData = {type, name, cost, diets, imageUrl, ingredients, isActive};

    // Parse and remove undefined fields
    Object.keys(productData).forEach(key => productData[key] === undefined && delete productData[key]);

    const newProduct = await Product.createProduct(productData);
    res.sendSuccess(newProduct, 201);
});

/**
 * Update an existing product.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
        throw new AppError("Invalid product ID.", 400, "INVALID_PRODUCT_ID", "Product ID must be a valid number.");
    }

    const {type, name, cost, diets, imageUrl, ingredients, isActive} = req.body;
    const updateData = {type, name, cost, diets, imageUrl, ingredients, isActive};

    // Parse and remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedProduct = await Product.updateProduct(productId, updateData);
    res.sendSuccess(updatedProduct);
});

/**
 * Delete a product by its ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const deleteProduct = asyncHandler(async (req, res) => {
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
        throw new AppError("Invalid product ID.", 400, "INVALID_PRODUCT_ID", "Product ID must be a valid number.");
    }

    await Product.deleteProduct(productId);
    res.sendSuccess({ message: `Product with ID ${productId} has been deleted.` });
});