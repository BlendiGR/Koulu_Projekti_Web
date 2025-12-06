import AppError from "../utils/AppError.js";
import {asyncHandler} from "../utils/async-handler.js";

/**
 * Middleware to authorize access based on ownership or admin role.
 * @param {Function} getRecordFn - Function that takes the owner ID and returns the resource record
 * @param {Object} options - Optional configuration
 * @param {string?} options.ownerField - The field name that represents the owner ID in the record (default: "userId")
 * @param {string} options.idField - The field name in req.params that contains the record ID (if different from "id")
 */
export const authorizeOwnerOrAdmin = (getRecordFn, options = {}) => {
    const {ownerField = "userId", idField } = options;

    return asyncHandler(async (req, res, next) => {
        const user = res.locals.user;

        if (!user) {
            throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
        }

        // admin automatically allowed
        if (user.role === "ADMIN") {
            return next();
        }

        const commonParamNames = ["id", "orderId", "reviewId", "productId", "userId"];
        const paramName = idField || commonParamNames.find((n) => req.params[n] !== undefined);
        const raw = paramName ? req.params[paramName] : undefined;
        const recordId = Number(raw);

        const record = await getRecordFn(recordId);

        if (!record) {
            throw new AppError("Resource not found", 404, "RESOURCE_NOT_FOUND");
        }

        if (record[ownerField] !== user.userId) {
            throw new AppError("Forbidden", 403, "FORBIDDEN");
        }

        next();
    });
}