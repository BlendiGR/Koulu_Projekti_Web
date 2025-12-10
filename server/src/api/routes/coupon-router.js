import express from "express";
import { authenticateToken, requireRole } from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import * as couponController from "../controllers/coupon-controller.js";
import {validateNoCouponQuery, validateCreateCoupon} from "../validators/coupon-validators.js";

const couponRouter = express.Router();

couponRouter.route("/")
    .get(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateNoCouponQuery,
        validationErrors,
        couponController.getAllCoupons
    )
    .post(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateCreateCoupon,
        validationErrors,
        couponController.createCoupon
    );

couponRouter.get("/:code", couponController.getCouponByCode);

couponRouter.delete(
    "/:id",
    authenticateToken,
    requireRole(["ADMIN"]),
    couponController.deleteCoupon
);

export default couponRouter;