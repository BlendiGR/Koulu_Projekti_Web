import { z } from "zod";

export const announcementSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title is too long"),
    message: z
        .string()
        .min(1, "Message is required"),
    isActive: z.boolean().optional().default(true),
});