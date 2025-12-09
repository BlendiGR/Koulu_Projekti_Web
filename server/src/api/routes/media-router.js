import express from "express";
import { upload } from "../../middleware/upload.js";
import * as mediaController from "../controllers/media-controller.js";
import {authenticateToken, requireRole} from "../../middleware/authentication.js";

const router = express.Router();

// POST /api/v1/media/upload
router.post("/upload",
    authenticateToken,
    requireRole(["ADMIN"]),
    upload.single("file"),
    mediaController.uploadFile
);

export default router;