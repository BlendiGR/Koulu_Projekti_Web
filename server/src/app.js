import express from "express";
import api from "./api/index.js";
import {errorHandler, notFoundHandler} from "./middleware/error-handlers.js";
import {successResponse} from "./middleware/success-response.js";

const app = express();

// Static Files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Standardize success responses
app.use(successResponse);

// API Routes
app.use("/api/v1", api);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;