import multer from "multer";
import { validationResult } from "express-validator";
import AppError from "../api/utils/AppError.js";

/**
 * Middleware to handle not found routes.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404, "blaablaa");
    next(error);
};

/**
 * Middleware default error handler.
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || err.status || 500;

    res.status(status).json({
        success: false,
        error: {
            message: err.message || "Internal Server Error",
            code: err.code || null,
            details: err.details || null,
            stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack
        }
    });
};

/**
 * Middleware for generic input validation.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const validationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => `${e.path}: ${e.msg}`).join(', ');
        const error = new Error(messages);
        error.status = 400;
        return next(error);
    }
    next();
};

/**
 * Middleware to handle Multer file upload errors.
 * @param err - Multer error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            error: {
                message: err.message,
                code: err.code
            }
        });
    }
    next(err);
}