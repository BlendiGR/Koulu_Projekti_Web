import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {validateCreateUser, validateUpdateUser, validateUserQuery} from "../validators/user-validators.js";

import * as userController from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/")
    .get(
        authenticateToken,
        requireRole(["ADMIN"]),
        validateUserQuery,
        validationErrors,
        userController.getAllUsers
    )
    .post(
        validateCreateUser,
        validationErrors,
        userController.createUser
    );

userRouter.route("/:userId")
    .get(
        authenticateToken,
        validateUserQuery,
        validationErrors,
        userController.getUserById
    )
    .put(
        authenticateToken,
        validateUpdateUser,
        validationErrors,
        userController.updateUser
    )
    .delete(
        authenticateToken,
        requireRole(["ADMIN"]),
        userController.deleteUser
    );

userRouter.route("/:userId/soft-delete")
    .put( // Not DELETE, since it just deactivates the user
        authenticateToken,
        userController.softDeleteUser
    );

export default userRouter;