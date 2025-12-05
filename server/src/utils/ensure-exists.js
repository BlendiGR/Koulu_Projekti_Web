import AppError from "./AppError.js";

/**
 * Ensure that an entity exists; if not, throw an error.
 * @param entity - The entity to check for existence.
 * @param message - Optional error message.
 * @param code - Optional error code.
 */
export const ensureExists = (entity, message = "Not found", code = "NOT_FOUND") => {
    if (!entity) throw new AppError(message, 404, code);
}