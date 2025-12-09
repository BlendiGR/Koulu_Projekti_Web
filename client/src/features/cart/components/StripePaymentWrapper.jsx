import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { fetchData } from "/src/utils/fetchData";
import Spinner from "/src/components/common/ui/Spinner";

// REPLACE THIS WITH YOUR OWN TEST KEY
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripePaymentWrapper = ({ children }) => {
    const { totalPrice, cartItems } = useCart();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads (or cart changes)
        // Only if we have items
        if (cartItems.length > 0) {
            fetchData("/api/v1/payments/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    items: cartItems.map(item => ({
                        id: item.productId || item.id, // ensuring id is present
                        quantity: item.quantity
                    })),
                    currency: "eur" 
                }),
            }).then((res) => {
                if (res.success) {
                    const secret = res.data?.clientSecret || res.clientSecret;
                    setClientSecret(secret); 
                    localStorage.setItem("stripe_client_secret", secret);
                }
            });
        }
    }, [cartItems]);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    return (
        <>
             {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                    {children}
                </Elements>
             ) : (
                 <div className="flex items-center justify-center h-full pt-20">
                     <Spinner size={40} />
                 </div>
             )}
        </>
    );
};

export default StripePaymentWrapper;
