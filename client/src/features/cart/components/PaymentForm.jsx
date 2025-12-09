import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useLang } from "/src/hooks/useLang.js";

const PaymentForm = ({ onFormChange }) => {
  const { t } = useLang();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Notify parent that the form is ready/valid (or at least mounted)
    // We can't know validation state without user interaction or events, 
    // but with PaymentElement, we usually assume valid structure until submission check.
    // However, to enable the "Place Order" button, we should signal valid.
    // Stripe Elements manages its own validation UI.
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
        {/* We can add a specialized container for styling if needed */}
        <div className="p-1">
             <PaymentElement id="payment-element" options={paymentElementOptions} />
        </div>
    </div>
  );
};

export default PaymentForm;
