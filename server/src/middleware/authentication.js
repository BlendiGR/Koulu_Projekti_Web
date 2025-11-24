import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Middleware to authenticate JWT token from Authorization header
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Must be "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded.userId)  {
            return res.status(403).json({ error: "Invalid token payload." });
        }

        res.locals.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({error: "Token has expired."});
        }

        return res.sendStatus(403).json({error: "Invalid or expired token."}); // Forbidden
    }
};

/**
 * Middleware to authorize user based on role
 * @param roles - Array of roles allowed to access the route
 */
export const requireRole = (roles) => (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(401).json({ error: "Unauthorized." });
    }

    if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied: insufficient permissions." });
    }
    next();
}