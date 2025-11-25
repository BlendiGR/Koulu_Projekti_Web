/**
 * Custom Error class for common application errors.
 * Built to standardize error handling across the application.
 */
export default class AppError extends Error {
    constructor(message, statusCode, code = null, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}