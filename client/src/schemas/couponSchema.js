import { z } from "zod";

export const couponSchema = z.object({
  coupon: z.string()
    .min(1, { message: "Coupon code is required." })
    .max(10, { message: "Coupon code must be 10 characters or less." })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Coupon code can only contain letters and numbers." })
});

export const couponAdminSchema = z.object({
    code: z.string()
        .min(1, { message: "Coupon code is required." })
        .max(10, { message: "Coupon code must be 10 characters or less." })
        .regex(/^[a-zA-Z0-9]+$/, { message: "Coupon code can only contain letters and numbers." }),
    discount: z.number()
        .min(1, { message: "Discount must be at least 1%." })
        .max(100, { message: "Discount cannot exceed 100%." }),
    isActive: z.boolean().optional()
});