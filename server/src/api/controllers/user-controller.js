import {asyncHandler} from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import {ensureExists} from "../../utils/ensure-exists.js";
import * as User from "../models/user-model.js";

/**
 * Check if user has reviewed.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getHasReviewed = asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    ensureExists(userId, "User not found", "USER_NOT_FOUND");
    const hasReviewed = await User.getHasReviewed(userId);
    res.sendSuccess(hasReviewed);
});

/**
 * Get all users with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllUsers = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, ...filters} = req.query;

    const users = await User.getUsers(filters, skip, take);

    res.sendSuccess(users);
});

/**
 * Get a single user by ID.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<*>}
 */
export const getUserById = asyncHandler(async (req, res) => {
    const requester = res.locals.user;
    const userId = Number(req.params.userId);

    if (requester.role !== "ADMIN" && requester.userId !== userId) {
        throw new AppError("Forbidden", 403, "FORBIDDEN");
    }

    const user = await User.getUserById(userId);
    ensureExists(user, "User not found", "USER_NOT_FOUND");

    res.sendSuccess(user);
});

/**
 * Create a new user.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createUser = asyncHandler(async (req, res) => {
    const userData = { ...req.body };

    // Parse and remove undefined fields
    Object.keys(userData).forEach(key => userData[key] === undefined && delete userData[key]);

    const newUser = await User.createUser(userData);
    res.sendSuccess(newUser, 201);
});

/**
 * Update an existing user.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const updateUser = asyncHandler(async (req, res) => {
    const requester = res.locals.user;
    const userId = Number(req.params.userId);

    if (requester.role !== "ADMIN" && requester.userId !== userId) {
        throw new AppError("Forbidden", 403, "FORBIDDEN", "You can only update your own account.");
    }

    const updateData = {...req.body};
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedUser = await User.updateUser(userId, updateData);

    res.sendSuccess(updatedUser);
});

/**
 * Soft delete a user by setting isActive to false.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const softDeleteUser = asyncHandler(async (req, res) => {
    const requester = res.locals.user;
    const userId = Number(req.params.userId);

    if (requester.role !== "ADMIN" && requester.userId !== userId) {
        throw new AppError("Forbidden", 403, "FORBIDDEN", "You can only delete your own account.");
    }

    const deletedUser = await User.softDeleteUser(userId);

    res.sendSuccess(deletedUser);
});

/**
 * Hard delete a user from the database.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const userId = Number(req.params.userId);
    await User.deleteUser(userId);
    res.sendStatus(204);
});