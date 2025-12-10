import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {validateProductIdParam, validateCreateProduct, validateUpdateProduct, validateProductQuery} from "../validators/product-validators.js";
import { upload } from "../../middleware/upload.js";

import * as productController from "../controllers/product-controller.js";

const productRouter = express.Router();

productRouter.route("/")
    .get(
        ...validateProductQuery,
        validationErrors,
        productController.getAllProducts
    )
    .post(
        authenticateToken,
        requireRole(["ADMIN"]),
        upload.single('file'),
        ...validateCreateProduct,
        validationErrors,
        productController.createProduct
    );

productRouter.route("/:productId")
    .get(
        ...validateProductIdParam,
        validationErrors,
        productController.getProductById
    )
    .put(
        authenticateToken,
        requireRole(["ADMIN"]),
        upload.single('file'),
        ...validateProductIdParam,
        ...validateUpdateProduct,
        validationErrors,
        productController.updateProduct
    )
    .delete(
        authenticateToken,
        requireRole(["ADMIN"]),
        ...validateProductIdParam,
        validationErrors,
        productController.deleteProduct
    );

export default productRouter;