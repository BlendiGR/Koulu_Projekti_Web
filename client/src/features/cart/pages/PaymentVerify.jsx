import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "/src/hooks/api";
import { useCart } from "/src/features/cart/hooks/useCart";
import Spinner from "/src/components/common/ui/Spinner";
import { useLang } from "/src/hooks/useLang";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentVerifyContent = () => {
  const [searchParams] = useSearchParams();
  const stripe = useStripe();
  const navigate = useNavigate();
  const { submitOrder } = useOrder();
  const { clearCart } = useCart();
  const { t } = useLang();
  
  const [status, setStatus] = useState("processing"); 
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!stripe) return;

    // Try URL first, then localStorage
    const clientSecret = searchParams.get("payment_intent_client_secret") || localStorage.getItem("stripe_client_secret");

    if (!clientSecret) {
        setStatus("error");
        setMessage("No payment intent found.");
        return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
            // Payment success. Check if we need to create order.
            const pendingOrderStr = localStorage.getItem("pendingOrder");
            
            if (pendingOrderStr) {
                try {
                    const pendingOrder = JSON.parse(pendingOrderStr);
                    // Add payment intent ID to the order data
                    const finalOrderData = {
                        ...pendingOrder,
                        paymentIntentId: paymentIntent.id
                    };

                    const res = await submitOrder(finalOrderData);
                    if (res.success) {
                        localStorage.removeItem("pendingOrder");
                        localStorage.removeItem("stripe_client_secret"); // Clean up secret
                        clearCart();
                        setStatus("success");
                        setMessage("Order confirmed!");
                        // Redirect to success page
                        setTimeout(() => navigate("/success/" + res.data.orderId), 1500);
                    } else {
                         setStatus("error");
                         setMessage("Payment successful but order creation failed. Please contact support.");
                         console.error("Order creation failed", res.error);
                    }
                } catch (e) {
                    console.error("Error creating order from pending data", e);
                    setStatus("error");
                    setMessage("Failed to process order details.");
                }
            } else {
                 // No pending order found? Maybe already created?
                 setStatus("error");
                 setMessage("Session expired or order already processed.");
                 setTimeout(() => navigate("/"), 3000);
            }
          break;
        case "processing":
          setStatus("processing");
          setMessage("Payment is processing.");
          break;
        case "requires_payment_method":
          setStatus("error");
          setMessage("Payment failed. Please try again.");
          setTimeout(() => navigate("/checkout"), 3000);
          break;
        default:
          setStatus("error");
          setMessage("Something went wrong.");
          break;
      }
    });

  }, [stripe, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {status === "processing" && <Spinner size={40} />}
        <h2 className={`text-xl font-bold ${status === "error" ? "text-red-500" : "text-gray-800"}`}>
            {message}
        </h2>
        {status === "error" && (
            <button 
                onClick={() => navigate("/checkout")}
                className="text-blue-500 underline mt-4"
            >
                Return to Checkout
            </button>
        )}
    </div>
  );
};

const PaymentVerify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // Try to get from URL, fallback to localStorage
    const clientSecret = searchParams.get("payment_intent_client_secret") || localStorage.getItem("stripe_client_secret");
    
    if (!clientSecret) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h2 className="text-xl font-bold text-red-500">
                No payment intent found.
            </h2>
            <div className="text-xs text-gray-500 bg-gray-100 p-4 rounded max-w-md overflow-auto">
                <p>Debug Info:</p>
                <p>URL: {window.location.href}</p>
                <p>Params: {searchParams.toString()}</p>
                <p>LS Secret: {localStorage.getItem("stripe_client_secret") ? "Present" : "Missing"}</p>
                <p>LS Order: {localStorage.getItem("pendingOrder") ? "Present" : "Missing"}</p>
            </div>
            <button 
                onClick={() => navigate("/checkout")}
                className="text-blue-500 underline mt-4"
            >
                Return to Checkout
            </button>
        </div>
      );
    }

    const options = { clientSecret };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentVerifyContent />
        </Elements>
    );
};

export default PaymentVerify;
