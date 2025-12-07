import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "/src/schemas/loginSchema.js";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="w-full max-w-md">
      <div className="bg-[#f5f0ea] rounded-xl shadow-md p-6">
        {/* Login/Register tabit */}
        <div className="flex mb-6 rounded-full overflow-hidden border border-gray-200">
          <div className="flex-1 bg-green-800 text-white py-2 text-center text-sm font-medium">
            Login
          </div>
          <Link
            to="/register"
            className="flex-1 bg-black/5 text-gray-700 py-2 text-center text-sm font-medium hover:bg-black/10 transition"
          >
            Register
          </Link>
        </div>

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
            className="mt-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            {t("nav.login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
