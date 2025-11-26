import {asyncHandler} from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import * as User from "../models/user-model.js";

/**
 * Get all users with optional filtering and pagination.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAllUsers = asyncHandler(async (req, res) => {
    const {skip = 0, take = 100, ...filters} = req.query;
    if (filters.userId) filters.userId = Number(filters.userId);

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

    if (isNaN(userId)) {
        throw new AppError("Invalid user ID", 400, "INVALID_USER_ID", "User ID must be a valid number.");
    }

    if (requester.role !== "ADMIN" && requester.userId !== userId) {
        throw new AppError("Forbidden", 403, "FORBIDDEN");
    }

    const user = await User.getUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND", `No user found with ID ${userId}`);
    }

    res.sendSuccess(user);
});

/**
 * Create a new user.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const createUser = asyncHandler(async (req, res) => {
    const {username, role, email, password, isActive} = req.body;
    const userData = {username, role, email, password, isActive};

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

    const {username, email, password, isActive} = req.body;
    const updateData = {username, email, password, isActive};

    // Parse and remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const updatedUser = await User.updateUser(userId, updateData);
    const {password: pwd, ...userWithoutPassword} = updatedUser;

    res.sendSuccess(userWithoutPassword);
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