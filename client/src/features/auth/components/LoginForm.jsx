import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "/src/schemas/loginSchema.js";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import RedButton from "/src/components/common/ui/RedButton";
import { useState } from "react";
import { useSearchParams } from "react-router";

const LoginForm = ({ t }) => {
  const { handleLogin } = useAuth();
  const [backendError, setBackendError] = useState(null);
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect") || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema(t)),
  });

  const onSubmit = async (data) => {
    setBackendError(null);

    const res = await handleLogin(data, redirectTo);

    if (!res.success) {
      if (res.error.message === "Invalid email or password.") {
        setBackendError(t("form.login.error.message"));
        return;
      }
      setBackendError(res.error.message);
      return;
    }
  };

  return (
    <>
      {backendError && (
        <p className="text-red-600 p-2 rounded text-md text-center mb-2">{backendError}</p>
      )}

      {redirectTo == "/review" && (
        <p className="text-red-600 p-2 rounded text-md text-center mb-2">
          {t("review.redirect")}
        </p>
      )}

      {redirectTo == "/checkout" && (
        <p className="text-red-600 p-2 rounded text-md text-center mb-2">
          {t("cart.loginToCheckout")}
        </p>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="font-medium">{t("form.email.label")}</label>
          <input
            type="email"
            placeholder={t("form.email.placeholder")}
            {...register("email")}
            className="border border-gray-300 p-2 rounded bg-white placeholder:text-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t("form.password.label")}</label>
          <input
            type="password"
            placeholder={t("form.password.placeholder")}
            {...register("password")}
            className="border border-gray-300 p-2 rounded bg-white placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-end text-xs text-gray-500">
          <button type="button" className="hover:underline">
            {t("form.login.forgotPassword")}
          </button>
        </div>

        <RedButton type="submit" className="font-semibold text-lg">
          {t("nav.login")}
        </RedButton>
      </form>
    </>
  );
};

export default LoginForm;
