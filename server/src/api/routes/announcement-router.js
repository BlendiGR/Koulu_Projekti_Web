import express from "express";
import { authenticateToken, requireRole } from "../../middleware/authentication.js";
import * as announcementController from "../controllers/announcement-controller.js";

const announcementRouter = express.Router();

announcementRouter.get("/", announcementController.getAnnouncement);

announcementRouter.put(
    "/",
    authenticateToken,
    requireRole(["ADMIN"]),
    announcementController.updateAnnouncement
);

export default announcementRouter;
