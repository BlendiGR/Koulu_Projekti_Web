import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../utils/AppError.js";

/**
 * Middleware to authenticate JWT token from Authorization header
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError("Authorization header missing or malformed.", 401, "UNAUTHORIZED");
    }

    // Must be "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId)  {
            throw new AppError("Invalid token payload.", 403, "FORBIDDEN");
        }

        res.locals.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new AppError("Expired token.", 401, "UNAUTHORIZED");
        }

        throw new AppError("Invalid or expired token.", 401, "UNAUTHORIZED");
    }
};

/**
 * Middleware to authorize user based on role
 * @param roles - Array of roles allowed to access the route
 */
export const requireRole = (roles) => (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        throw new AppError("Missing authentication.", 401, "UNAUTHORIZED");
    }

    if (!roles.includes(user.role)) {
        throw new AppError("Access denied: insufficient permissions.", 403, "FORBIDDEN");
    }
    next();
}