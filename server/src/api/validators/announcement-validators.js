import { body } from "express-validator";

export const validateUpdateAnnouncement = [
    body("id").not().exists().withMessage("ID cannot be modified in the request body"),
    body("createdAt").not().exists().withMessage("createdAt cannot be modified"),
    body("isSingleton").not().exists().withMessage("isSingleton flag cannot be modified"),
    body("couponId").not().exists().withMessage("couponId cannot be modified"),
    body("title")
        .optional()
        .isString().withMessage("Title must be a string")
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage("Title must be between 1 and 100 characters"),
    
    body("message")
        .optional()
        .isString().withMessage("Message must be a string")
        .trim()
        .isLength({ min: 1, max: 1000 }).withMessage("Message must be between 1 and 1000 characters"),
    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive must be a boolean"),
];