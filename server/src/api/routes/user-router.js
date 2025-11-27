import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {
    validateCreateUser,
    validateUpdateUser,
    validateUserIdParam,
    validateUserQuery
} from "../validators/user-validators.js";

import * as userController from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/")
    .get(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateUserQuery,
        validationErrors,
        userController.getAllUsers
    )
    .post(
        ...validateCreateUser,
        validationErrors,
        userController.createUser
    );

userRouter.route("/:userId")
    .get(
        authenticateToken,
        ...validateUserIdParam,
        validationErrors,
        userController.getUserById
    )
    .put(
        authenticateToken,
        ...validateUserIdParam,
        validateUpdateUser,
        validationErrors,
        userController.updateUser
    )
    .delete(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateUserIdParam,
        validationErrors,
        userController.deleteUser
    );

userRouter.route("/:userId/soft-delete")
    .put( // Not DELETE, since it just deactivates the user
        authenticateToken,
        ...validateUserIdParam,
        validationErrors,
        userController.softDeleteUser
    );

export default userRouter;