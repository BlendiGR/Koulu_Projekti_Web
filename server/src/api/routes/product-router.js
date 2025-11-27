import express from "express";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";
import {validationErrors} from "../../middleware/error-handlers.js";
import {validateProductIdParam, validateCreateProduct, validateUpdateProduct, validateProductQuery} from "../validators/product-validators.js";

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
        ...validateCreateProduct,
        validationErrors,
        productController.createProduct
    );

productRouter.route("/:productId")
    .get(
        ...validateProductQuery,
        validationErrors,
        productController.getProductById
    )
    .put(
        authenticateToken,
        requireRole(["ADMIN"]),
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