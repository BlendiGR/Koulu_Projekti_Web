import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useLang } from "/src/hooks/useLang.js";

const PaymentForm = ({ onFormChange }) => {
  const { t } = useLang();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (stripe && elements) {
      onFormChange(true, { method: "stripe" });
    } else {
        onFormChange(false, null);
    }
  }, [stripe, elements, onFormChange]);

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="w-full">
        <div className="p-1">
             <PaymentElement id="payment-element" options={paymentElementOptions} />
        </div>
    </div>
  );
};

export default PaymentForm;
