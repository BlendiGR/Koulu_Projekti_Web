import express from "express";
import { authenticateToken, requireRole } from "../../middleware/authentication.js";
import * as couponController from "../controllers/coupon-controller.js";

const couponRouter = express.Router();

couponRouter.get("/code/:code", couponController.getCouponByCode);

couponRouter.post(
    "/",
    authenticateToken,
    requireRole(["ADMIN"]),
    couponController.createCoupon
);

couponRouter.delete(
    "/:id",
    authenticateToken,
    requireRole(["ADMIN"]),
    couponController.deleteCoupon
);

export default couponRouter;
