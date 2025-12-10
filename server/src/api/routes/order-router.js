import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {authorizeOwnerOrAdmin} from "../../middleware/authorization.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {
    validateOrderIdParam,
    validateCreateOrder,
    validateUpdateOrder,
    validateOrderQuery
} from "../validators/order-validators.js";

import {getOrderById} from "../models/order-model.js";
import * as orderController from "../controllers/order-controller.js";
import * as emailController from "../controllers/email-controller.js";

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
        orderController.createOrder,
        emailController.sendOrderEmail
    );


orderRouter.route("/:orderId")
    .get(
        authenticateToken,
        authorizeOwnerOrAdmin(getOrderById, {idField: "orderId"}),
        ...validateOrderIdParam,
        validationErrors,
        orderController.getOrderWithProducts
    )
    .put(
        authenticateToken,
        requireRole(["ADMIN"]),
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