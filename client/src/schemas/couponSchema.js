import { z } from "zod";

export const couponSchema = z.object({
  coupon: z.string()
    .min(1, { message: "Coupon code is required." })
    .max(10, { message: "Coupon code must be 10 characters or less." })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Coupon code can only contain letters and numbers." })
});

