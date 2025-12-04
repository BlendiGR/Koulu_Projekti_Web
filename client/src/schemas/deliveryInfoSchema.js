import { z } from "zod";

export const deliverySchema = (t) =>
  z.object({
    firstName: z.string().min(2, t("delivery.firstName.min")),

    lastName: z.string().min(2, t("delivery.lastName.min")),

    phone: z
      .string()
      .regex(/^(?:\+358|0)\s?\d[\d\s-]{5,}$/, t("delivery.phone.invalid")),

    street: z.string().min(5, t("delivery.street.min")),

    postalCode: z
      .string()
      .regex(/^[0-9]{5}$/, t("delivery.postalCode.invalid")),

    city: z.string().min(2, t("delivery.city.min")),
  });

// Simplified schema without translation (for basic usage)
export const deliveryInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^(?:\+358|0)\s?\d[\d\s-]{5,}$/, "Invalid Finnish phone number"),
  street: z.string().min(5, "Street address is too short"),
  postalCode: z.string().regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

