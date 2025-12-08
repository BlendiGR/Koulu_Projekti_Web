import { z } from "zod";

export const deliveryInfoSchema = (t) =>
  z.object({
    phone: z
      .string()
      .regex(/^(?:\+358\s?(?:40|41|44|45)\s?\d{3}\s?\d{4}|0(?:40|41|44|45)\s?\d{3}\s?\d{4})$/, t("delivery.phone.invalid")),

    street: z.string().min(5, t("delivery.street.min")),

    postalCode: z
      .string()
      .regex(/^[0-9]{5}$/, t("delivery.postalCode.invalid")),

    city: z.string().min(2, t("delivery.city.min")),
  });

