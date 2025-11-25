import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

import {asyncHandler} from "../utils/async-handler.js";
import {getUserByEmail} from "../models/user-model.js";
import AppError from "../utils/AppError.js";

/**
 * User login controller.
 * @param req - Express request object
 * @param res - Express response object
 * @type {(function(*, *, *): void)|*}
 */
export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new AppError("Email and password are required.", 400, "BAD_REQUEST");
    }

    const user = await getUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password.", 404, "USER_NOT_FOUND");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
    }

    const userWithoutPassword = (({ password, ...rest }) => rest)(user);

    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });

    res.sendSuccess({token, userWithoutPassword})
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