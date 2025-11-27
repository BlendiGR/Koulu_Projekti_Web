import { z } from "zod";

export const loginSchema = (t) =>
  z.object({
    email: z.string().email(t("login.email.invalid")),
    password: z.string().min(6, t("login.password.min")),
  });
