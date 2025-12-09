import { z } from "zod";

export const registerSchema = (t) =>
  z
    .object({
      firstName: z
        .string()
        .min(2, t("register.firstName.min"))
        .regex(/^[\p{L}](?:[\p{L}\p{M}]|[ '-](?=[\p{L}]))*[\p{L}]$/u, t("register.fullName.invalid")),

      lastName: z
        .string()
        .min(2, t("register.lastName.min"))
        .regex(/^[\p{L}](?:[\p{L}\p{M}]|[ '-](?=[\p{L}]))*[\p{L}]$/u, t("register.fullName.invalid")),

      email: z.email(t("register.email.invalid")),

      password: z
        .string()
        .min(8, t("register.password.min"))
        .regex(/[A-Z]/, t("register.password.uppercase"))
        .regex(/[a-z]/, t("register.password.lowercase"))
        .regex(/\d/, t("register.password.number"))
        .regex(/[^A-Za-z0-9]/, t("register.password.symbol")),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("register.confirmPassword.mismatch"),
      path: ["confirmPassword"],
    });
