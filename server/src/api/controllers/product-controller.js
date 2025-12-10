import {asyncHandler} from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import {normalizeSort} from "../../utils/normalize-sort.js";
import * as Product from "../models/product-model.js";

/**
 * Get all products with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllProducts = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, sortBy, sortOrder, ...filters} = req.query;

    const skipNum = Number(skip);
    const takeNum = Number(take);

    const normalizedSort = normalizeSort(sortOrder, sortBy) || { sortOrder: undefined, sortField: undefined };

    const products = await Product.getProducts(filters, skipNum, takeNum, normalizedSort.sortField, normalizedSort.sortOrder);
    const count = await Product.getProductCount(filters);

    res.sendSuccess({data: products, total: count});
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
    let {type, name, cost, diets, imageUrl, ingredients, isActive} = req.body;

    // If a file was uploaded directly to this endpoint, build its absolute URL and use it
    if (req.file) {
        const host = req.get('host');
        const protocol = req.protocol;
        imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // If diets/ingredients come as strings (multipart), try to parse them
    if (typeof diets === 'string') {
        try { diets = JSON.parse(diets); } catch { diets = diets.split(',').map(s => s.trim()).filter(Boolean); }
    }
    if (typeof ingredients === 'string') {
        try { ingredients = JSON.parse(ingredients); } catch { ingredients = ingredients.split(',').map(s => s.trim()).filter(Boolean); }
    }

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

    let {type, name, cost, diets, imageUrl, ingredients, isActive} = req.body;

    // If a file was uploaded directly to this endpoint, build its absolute URL and use it
    if (req.file) {
        const host = req.get('host');
        const protocol = req.protocol;
        imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    // If diets/ingredients come as strings (multipart), try to parse them
    if (typeof diets === 'string') {
        try { diets = JSON.parse(diets); } catch { diets = diets.split(',').map(s => s.trim()).filter(Boolean); }
    }
    if (typeof ingredients === 'string') {
        try { ingredients = JSON.parse(ingredients); } catch { ingredients = ingredients.split(',').map(s => s.trim()).filter(Boolean); }
    }

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