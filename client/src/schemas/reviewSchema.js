import { z } from "zod";

export const reviewSchema = (t) =>
    z.object({
        rating: z.preprocess((val) => {
            if (typeof val === "string" && val.trim() !== "") return Number(val);
            return val;
        }, z.number().int().min(1, t("review.rating.min")).max(5, t("review.rating.max"))),
        review: z
            .string()
            .min(1, t("review.review.required"))
            .max(300, t("review.review.max")),
        username: z
            .string()
            .min(1, t("review.username.required"))
            .max(100, t("review.username.max")),
        isActive: z.boolean().optional()
    });

export default reviewSchema;