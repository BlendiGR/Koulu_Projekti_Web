import { body } from "express-validator";

export const validateCreateCoupon = [
    body("code")
        .notEmpty().withMessage("Coupon code is required")
        .isString().withMessage("Code must be a string")
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Code must be between 3 and 50 characters"),
    
    body("discount")
        .notEmpty().withMessage("Discount is required")
        .isDecimal().withMessage("Discount must be a decimal number")
        .custom((value) => {
            if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                throw new Error("Discount must be between 0 and 100");
            }
            return true;
        }),
    
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean"),
];

export const validateUpdateCoupon = [
    body("id").not().exists().withMessage("ID cannot be modified in the request body"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
    
    body("code")
        .optional()
        .isString().withMessage("Code must be a string")
        .trim()
        .isLength({ min: 3, max: 50 }).withMessage("Code must be between 3 and 50 characters"),
    
    body("discount")
        .optional()
        .isDecimal().withMessage("Discount must be a decimal number")
        .custom((value) => {
            if (value !== undefined && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
                throw new Error("Discount must be between 0 and 100");
            }
            return true;
        }),
    
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean"),
];
