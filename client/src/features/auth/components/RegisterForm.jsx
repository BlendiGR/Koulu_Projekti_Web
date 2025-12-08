import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "/src/schemas/registerSchema.js";
import { useState } from "react";

const RegisterForm = ({ t }) => {
  const [backendError, setBackendError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema(t)),
  });

  const onSubmit = async (data) => {
    setBackendError(null);
    console.log("Register submit data:", data);
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
            <label className="font-medium">
              {t("register.fullName.label")}
            </label>
            <input
              type="text"
              placeholder={t("register.fullName.placeholder")}
              {...register("fullName")}
              className="border border-gray-300 p-2 rounded bg-white placeholder:text-gray-400"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">{t("register.email.label")}</label>
            <input
              type="email"
              placeholder={t("register.email.placeholder")}
              {...register("email")}
              className="border border-gray-300 p-2 rounded bg-white placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-medium">
              {t("register.password.label")}
            </label>
            <input
              type="password"
              placeholder={t("register.password.placeholder")}
              {...register("password")}
              className="border border-gray-300 p-2 rounded bg-white placeholder:text-gray-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              {t("register.confirmPassword.label")}
            </label>
            <input
              type="password"
              placeholder={t("register.confirmPassword.placeholder")}
              {...register("confirmPassword")}
              className="border border-gray-300 p-2 rounded bg-white placeholder:text-gray-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <input type="checkbox" className="mt-1" {...register("terms")} />
            <p>
              I agree to the <span className="underline">Terms of Service</span>{" "}
              and <span className="underline">Privacy Policy</span>
            </p>
          </div>

          <button
            type="submit"
            className="mt-2 bg-red-100 text-white py-2 rounded hover:bg-red-200 transition"
          >
            Create Account
          </button>
      </form>
    </>
  );
};

export default RegisterForm;
