import express from "express";
import {
  authenticateToken,
  requireRole,
} from "../../middleware/authentication.js";
import { authorizeOwnerOrAdmin } from "../../middleware/authorization.js";
import { validationErrors } from "../../middleware/error-handlers.js";
import {
  validateCreateUser,
  validateUpdateUser,
  validateUserIdParam,
  validateUserQuery,
} from "../validators/user-validators.js";

import { getUserById } from "../models/user-model.js";
import * as userController from "../controllers/user-controller.js";
import * as orderController from "../controllers/order-controller.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(
    authenticateToken,
    requireRole(["ADMIN"]),
    ...validateUserQuery,
    validationErrors,
    userController.getAllUsers
  )
  .post(...validateCreateUser, validationErrors, userController.createUser);

userRouter
  .route("/:userId")
  .get(
    authenticateToken,
    authorizeOwnerOrAdmin(getUserById, { idField: "userId" }),
    ...validateUserIdParam,
    validationErrors,
    userController.getUserById
  )
  .put(
    authenticateToken,
    authorizeOwnerOrAdmin(getUserById, { idField: "userId" }),
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

userRouter.route("/reviews/:userId")
    .get(
        authenticateToken,
        ...validateUserIdParam,
        validationErrors,
        userController.getHasReviewed
    );

userRouter.route("/:userId")
    .get(
        authenticateToken,
        authorizeOwnerOrAdmin(getUserById, {idField: "userId"}),
        ...validateUserIdParam,
        validationErrors,
        userController.getUserById
    )
    .put(
        authenticateToken,
        authorizeOwnerOrAdmin(getUserById, {idField: "userId"}),
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
userRouter
  .route("/:userId/soft-delete")
  .put(
    authenticateToken,
    authorizeOwnerOrAdmin(getUserById, { idField: "userId" }),
    ...validateUserIdParam,
    validationErrors,
    userController.softDeleteUser
  );

// 🔹 UUSI: hae käyttäjän omat tilaukset (vain omistaja tai ADMIN)
userRouter
  .route("/:userId/orders")
  .get(
    authenticateToken,
    authorizeOwnerOrAdmin(getUserById, { idField: "userId" }),
    ...validateUserIdParam,
    validationErrors,
    orderController.getOrdersByUserId
  );

export default userRouter;
