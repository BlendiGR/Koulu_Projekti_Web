import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "/src/schemas/loginSchema.js";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { useState } from "react";

const LoginForm = ({ t }) => {
  const { handleLogin } = useAuth();
  const [backendError, setBackendError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema(t)),
  });

  const onSubmit = async (data) => {
    setBackendError(null);
    const res = await handleLogin(data);

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
          <p className="text-red-600 p-2 rounded text-sm mb-2">
            {backendError}
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
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 bg-red-100 text-white py-2 rounded hover:bg-red-200 transition"
          >
            {t("nav.login")}
          </button>
      </form>
    </>
  );
};

export default LoginForm;
