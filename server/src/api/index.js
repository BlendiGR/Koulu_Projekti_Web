import express from "express";

import userRouter from "./routes/user-router.js";
import authRouter from "./routes/auth-router.js";
import productRouter from "./routes/product-router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;