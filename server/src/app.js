import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import api from "./api/index.js";
import {errorHandler, notFoundHandler} from "./middleware/error-handlers.js";
import {successResponse} from "./middleware/success-response.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Static Files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Standardize success responses
app.use(successResponse);

// API Routes
app.use("/api/v1", api);

app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;