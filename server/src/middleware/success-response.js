/**
 * Middleware to standardize successful API responses
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const successResponse = (req, res, next) => {
    res.sendSuccess = (data, status = 200) => {
        return res.status(status).json({
            success: true,
            data: data
        });
    };

    next();
}