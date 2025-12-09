import { z } from "zod";

export const deliveryInfoSchema = (t) =>
  z.object({
    firstName: z
      .string()
      .min(2, t("delivery.firstName.min"))
      .regex(
        /^[\p{L}](?:[\p{L}\p{M}]|[ '-](?=[\p{L}\p{M}]))*[\p{L}]$/u,
        t("register.fullName.invalid")
      ),
    lastName: z
      .string()
      .min(2, t("delivery.lastName.min"))
      .regex(
        /^[\p{L}](?:[\p{L}\p{M}]|[ '-](?=[\p{L}\p{M}]))*[\p{L}]$/u,
        t("register.fullName.invalid")
      ),

    phone: z
      .string()
      .regex(
        /^(?:\+358|0)(?:40|41|44|45)[\s-]?\d{3}[\s-]?\d{4}$/,
        t("delivery.phone.invalid")
      ),

    street: z
      .string()
      .min(5, t("delivery.street.min")),

    postalCode: z
      .string()
      .regex(/^[0-9]{5}$/, t("delivery.postalCode.invalid")),

    city: z
      .string()
      .min(2, t("delivery.city.min")),
  });
