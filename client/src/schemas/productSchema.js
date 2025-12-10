import { z } from "zod";

export const productSchema  = (t) => z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(["FOOD", "DRINK", "SIDE"]),
  // accept cost as string or number and coerce to number, allow decimals
  cost: z.preprocess((val) => {
    if (val === "" || val == null) return undefined;
    if (typeof val === "string") {
      const n = Number(val);
      return Number.isNaN(n) ? val : n;
    }
    return val;
  }, z.number().positive({ message: "Cost must be a positive number" }).optional()),
  imageUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")).transform((v) => (v === "" ? undefined : v)),
  diets: z.preprocess((val) => {
    if (val == null || val === "") return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return val.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
    return val;
  }, z.array(z.string()).optional()),
  ingredients: z.preprocess((val) => {
    if (val == null || val === "") return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return val.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
    return val;
  }, z.array(z.string()).optional()),
  isActive: z.boolean().optional(),
});

export default productSchema;