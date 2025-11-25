import express from "express";
import {authenticateToken} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {validateLogin} from "../validators/auth-validators.js";

import * as authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.route("/login")
    .post(
        validateLogin,
        validationErrors,
        authController.login
    );

authRouter.route("/me")
    .get(
        authenticateToken,
        authController.getCurrentUser
    );

export default authRouter;