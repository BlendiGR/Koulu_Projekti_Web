import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

import {asyncHandler} from "../../utils/async-handler.js";
import {getUserByEmail} from "../models/user-model.js";
import AppError from "../../utils/AppError.js";

/**
 * User login controller.
 * @param req - Express request object
 * @param res - Express response object
 * @type {(function(*, *, *): void)|*}
 */
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Email and password are required.", 400, "BAD_REQUEST");
    }

    const user = await getUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new AppError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    // only include necessary user info in the token payload
    const payload = {
        userId: user.userId,
        email: user.email,
        role: user.role,
    };

    if (!process.env.JWT_SECRET) {
        throw new AppError("Server misconfiguration: missing JWT secret", 500, "SERVER_ERROR");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    // exclude password from the returned user object
    const { password: _, ...safeUser } = user;
    res.sendSuccess({ token, user: safeUser });
});

/**
 * Get current authenticated user controller.
 * @param req - Express request object
 * @param res - Express response object
 * @type {(function(*, *, *): void)|*}
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
   if (res.locals.user) {
       res.sendSuccess(res.locals.user);
   } else {
       throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
   }
});