import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useLang } from "/src/hooks/useLang.js";

const PaymentForm = ({ onFormChange }) => {
  const { t } = useLang();
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    onFormChange(true, { method: "mock" });
  }, []);

  return (
    <div>
      <div className="p-4 bg-green-50 text-green-700 rounded-lg"></div>
    </div>
  );
};

export default PaymentForm;
