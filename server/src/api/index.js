import express from "express";

import userRouter from "./routes/user-router.js";
import authRouter from "./routes/auth-router.js";
import productRouter from "./routes/product-router.js";
import orderRouter from "./routes/order-router.js";
import reviewRouter from "./routes/review-router.js";
import announcementRouter from "./routes/announcement-router.js";
import couponRouter from "./routes/coupon-router.js";
import paymentRouter from "./routes/paymentRoutes.js";
import emailRouter from "./routes/email-router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/reviews", reviewRouter);
router.use("/announcement", announcementRouter);
router.use("/coupons", couponRouter);
router.use("/payments", paymentRouter);
router.use("/emails", emailRouter);

export default router;