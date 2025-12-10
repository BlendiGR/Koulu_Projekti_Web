import express from "express";
import { authenticateToken, requireRole } from "../../middleware/authentication.js";
import * as emailController from "../controllers/email-controller.js";

const emailRouter = express.Router();

emailRouter.post(
    "/review",
    authenticateToken,
    requireRole(["ADMIN"]),
    emailController.sendReviewEmail
);

export default emailRouter;
