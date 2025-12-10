import prisma from "../../prisma.js";
import AppError from "../../utils/AppError.js";

/**
 * Get the singleton announcement (the active one).
 * @returns {Promise<*>}
 */
export const getAnnouncement = async () => {
    return prisma.announcement.findFirst({
        where: { 
            isSingleton: true,
            isActive: true 
        }
    });
};

/**
 * Get the singleton announcement for admin (regardless of isActive).
 */
export const getAdminAnnouncement = async () => {
    return prisma.announcement.findFirst({
        where: {
            isSingleton: true,
        },
    });
};

/**
 * Update the singleton announcement.
 * @param {number} id - The ID of the announcement to update.
 * @param {Object} updateData - The data to update the announcement with.
 * @returns {Promise<*>}
 */
export const updateAnnouncement = async (id, updateData) => {
    try {
        return await prisma.announcement.update({
            where: { id: Number(id) },
            data: updateData
        });
    } catch (error) {
        if (error.code === 'P2025') {
            throw new AppError("Announcement not found.", 404, "ANNOUNCEMENT_NOT_FOUND", `No announcement found with ID ${id}`);
        }
        throw new AppError("Failed to update announcement.", 500, "ANNOUNCEMENT_UPDATE_FAILED", error.message);
    }
};