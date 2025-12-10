import prisma from "../../prisma.js";
import bcrypt from "bcrypt";
import AppError from "../../utils/AppError.js";

/**
 * Valid user roles.
 * @type {string[]}
 */
export const VALID_ROLES = ["CUSTOMER", "ADMIN"];

/**
 * Common select object to exclude password field.
 * @type {{userId: boolean, username: boolean, email: boolean, role: boolean, isActive: boolean, createdAt: boolean}}
 */
const withoutPasswordSelect = {
    userId: true,
    username: true,
    email: true,
    role: true,
    isActive: true,
    createdAt: true,
}

/**
 * Valid query params for the user model.
 * Used in validators/user-validators.js
 */
export const userFields = [
    "userId",
    "email",
    "username",
    "role"
];

/**
 * Get all users from the database.
 * @param {Object} filter - Filter criteria for querying users.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @returns {Promise<*>}
 */
export const getUsers = async (filter = {}, skip = 0, take = 100, sortBy, sortOrder = "asc") => {
    return prisma.user.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
        select: withoutPasswordSelect,
        orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : undefined,
    });
};

/**
 * Get user count.
 * @param {Object} filter - Filter criteria for counting users.
 * @returns {Promise<number>}
 */
export const getUserCount = async (filter = {}) => {
    return prisma.user.count({
        where: filter
    });
};

/**
 * Check if user has reviewed.
 * @param {number} userId - The ID of the user to check.
 * @returns {Promise<*>}
 */
export const getHasReviewed = async (userId) => {
    return prisma.user.findUnique({
        where: { userId: Number(userId) },
        select: {
            userId: true,
            username: true,
            reviewed: true,
        },
    })
};

/**
 * Get a user by their ID.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<*>}
 */
export const getUserById = async (userId) => {
    return prisma.user.findUnique({
        where: { userId: Number(userId) },
        select: withoutPasswordSelect
    });
};

/**
 * Get user by their email.
 * Used in authentication where password is needed.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<*>}
 */
export const getUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email: email }
    });
};

/**
 * Get user by their ID, including their orders.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<*>}
 */
export const getUserWithOrders = async (userId) => {
    return prisma.user.findUnique({
        where: { userId: Number(userId) },
        select: {
            ...withoutPasswordSelect,
            orders: true,
        },
    });
}

/**
 * TODO:
 *  Handle admin creation separately.
 *
 * Create a new user in the database.
 * @param {Object} userData - The data of the user to create.
 * @returns {Promise<*>}
 */
export const createUser = async (userData) => {
    try {
        userData.password = await bcrypt.hash(userData.password, Number(process.env.BCRYPT_SALT) || 10);
        return await prisma.user.create({
            data: userData,
            select: withoutPasswordSelect,
        });
    } catch (error) {
        if (error.code === 'P2002') { // Unique field violation
            throw new AppError('Username or email already exists.', 400, 'DUPLICATE_FIELD');
        }

        throw new AppError('Failed to create user.', 500, 'USER_CREATION_FAILED', error);
    }
};

/**
 * Update an existing user in the database.
 * @param {number} userId - The ID of the user to update.
 * @param {Object} updateData - The data to update.
 * @returns {Promise<*>}
 */
export const updateUser = async (userId, updateData) => {
    try {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, Number(process.env.BCRYPT_SALT) || 10);
        }
        return await prisma.user.update({
            where: { userId: Number(userId) },
            data: updateData,
            select: withoutPasswordSelect,
        });
    } catch (error) {
        if (error.code === 'P2002') { // Unique field violation
            throw new AppError('Username or email already exists.', 400, 'DUPLICATE_FIELD');
        } else if (error.code === 'P2025') { // Record not found
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND', `No user found with ID ${userId}`);
        }

        throw new AppError('Failed to update user.', 500, 'USER_UPDATE_FAILED', error);
    }
};


/**
 * Soft delete a user by setting isActive to false.
 * @param {number} userId - The ID of the user to soft delete.
 * @returns {Promise<*>}
 */
export const softDeleteUser = async (userId) => {
    try {
        return await prisma.user.update({
            where: { userId: Number(userId) },
            data: { isActive: false },
            select: withoutPasswordSelect,
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND', `No user found with ID ${userId}`);
        }

        throw new AppError('Failed to soft delete user.', 500, 'USER_SOFT_DELETE_FAILED', error);
    }
};

/**
 * Delete a user from the database.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<*>}
 */
export const deleteUser = async (userId) => {
    try {
        await prisma.user.delete({
            where: { userId: Number(userId) },
        });
        return true;
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND', `No user found with ID ${userId}`);
        }

        throw new AppError('Failed to delete user.', 500, 'USER_DELETION_FAILED', error);
    }
};