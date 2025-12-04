import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {
    validateOrderIdParam,
    validateCreateOrder,
    validateUpdateOrder,
    validateOrderQuery
} from "../validators/order-validators.js";

import * as orderController from "../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.route("/")
    .get(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateOrderQuery,
        validationErrors,
        orderController.getAllOrders
    )
    .post(
        authenticateToken,
        ...validateCreateOrder,
        validationErrors,
        orderController.createOrder
    );

orderRouter.route("/:orderId")
    .get(
        authenticateToken,
        ...validateOrderIdParam,
        validationErrors,
        orderController.getOrderById
    )
    .put(
        authenticateToken,
        ...validateOrderIdParam,
        ...validateUpdateOrder,
        validationErrors,
        orderController.updateOrder
    )
    .delete(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateOrderIdParam,
        validationErrors,
        orderController.deleteOrder
    );

export default orderRouter;