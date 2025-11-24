/**
 * A utility function to wrap asynchronous route handlers in Express.js.
 * This ensures that any errors thrown in the async functions are properly
 * passed to the next middleware (typically an error handler).
 *
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} A new function that wraps the original function with error handling.
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}