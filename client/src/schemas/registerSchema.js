import { z } from "zod";

export const registerSchema = (t) =>
  z
    .object({
      fullName: z
        .string()
        .min(3, t("register.fullName.min"))
        .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, t("register.fullName.invalid")),

      email: z.string().email(t("register.email.invalid")),

      phone: z
        .string()
        .regex(/^(?:\+358|0)\s?\d[\d\s-]{5,}$/, t("register.phone.invalid")),

      password: z
        .string()
        .min(8, t("register.password.min"))
        .regex(/[A-Z]/, t("register.password.uppercase"))
        .regex(/[a-z]/, t("register.password.lowercase"))
        .regex(/\d/, t("register.password.number"))
        .regex(/[^A-Za-z0-9]/, t("register.password.symbol")),

      confirmPassword: z.string(),

      terms: z
        .boolean()
        .refine((v) => v === true, t("register.terms.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("register.confirmPassword.mismatch"),
      path: ["confirmPassword"],
    });
