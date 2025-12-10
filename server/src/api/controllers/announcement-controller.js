import { asyncHandler } from "../../utils/async-handler.js";
import AppError from "../../utils/AppError.js";
import * as Announcement from "../models/announcement-model.js";

/**
 * Get the active singleton announcement.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.getAnnouncement();
    
    if (!announcement) {
        throw new AppError("No announcement found.", 404, "ANNOUNCEMENT_NOT_FOUND");
    }

    res.sendSuccess(announcement);
});

/**
 * Get the singleton announcement for admin.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const getAdminAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.getAdminAnnouncement();

    if (!announcement) {
        throw new AppError("No announcement found.", 404, "ANNOUNCEMENT_NOT_FOUND");
    }

    res.sendSuccess(announcement);
});

/**
 * Update the singleton announcement.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 */
export const updateAnnouncement = asyncHandler(async (req, res) => {
    const { title, message, isActive } = req.body;
    const updateData = { title, message, isActive };

    Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key],
    );

    const announcement = await Announcement.getAdminAnnouncement();

    if (!announcement) {
        throw new AppError("No announcement found to update.", 404, "ANNOUNCEMENT_NOT_FOUND");
    }

    const updatedAnnouncement = await Announcement.updateAnnouncement(
        announcement.id,
        updateData,
    );
    res.sendSuccess(updatedAnnouncement);
});