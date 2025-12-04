import { z } from "zod";

export const deliveryInfoSchema = (t) =>
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

