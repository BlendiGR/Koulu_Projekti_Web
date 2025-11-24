import prisma from "../../prisma.js";

/**
 * Get all users from the database.
 * @param {Object} filter - Filter criteria for querying users.
 * @param {number} skip - Number of records to skip for pagination.
 * @param {number} take - Number of records to take for pagination.
 * @returns {Promise<*>}
 */
export const getUsers = async (filter = {}, skip = 0, take = 100) => {
    return prisma.user.findMany({
        where: filter,
        skip: Number(skip),
        take: Number(take),
    });
};

/**
 * Get a user by their ID.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<*>}
 */
export const getUserById = async (userId) => {
    return prisma.user.findUnique({
        where: { userId: Number(userId) }
    });
};

/**
 * Get user by their username.
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<*>}
 */
export const getUserByUsername = async (username) => {
    return prisma.user.findUnique({
        where: { username: username }
    });
};

/**
 * Get user by their email.
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
        include: { orders: true },
    });
}

/**
 * Create a new user in the database.
 * @param {Object} userData - The data of the user to create.
 * @returns {Promise<*>}
 */
export const createUser = async (userData) => {
    try {
        return prisma.user.create({
            data: userData,
        });
    } catch (error) {
        if (error.code === 'P2002') { // Unique field violation
            throw new Error('Username or email already exists.');
        }
        throw error;
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
        return prisma.user.update({
            where: { userId: Number(userId) },
            data: updateData,
        });
    } catch (error) {
        if (error.code === 'P2002') { // Unique field violation
            throw new Error('Username or email already exists.');
        } else {
            throw error;
        }
    }
};

/**
 * Delete a user from the database.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<*>}
 */
export const deleteUser = async (userId) => {
    try {
        return prisma.user.delete({
            where: { userId: Number(userId) },
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            throw new Error('User not found.');
        }
        throw error;
    }
};