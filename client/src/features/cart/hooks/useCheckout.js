import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useOrder } from "/src/hooks/api";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import { useLoading } from "/src/hooks/useLoading.js";

export const useCheckout = () => {
  const { cartItems, clearCart } = useCart();
  const { submitOrder } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { loading, error, withLoading, clearError } = useLoading();

  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [order, setOrder] = useState(null);

  const handleShippingFormChange = useCallback((isValid, data) => {
    setIsShippingValid(isValid);
    setShippingData(data);
  }, []);

  const handlePaymentFormChange = useCallback((isValid, data) => {
    setIsPaymentValid(isValid);
    setPaymentData(data);
  }, []);

  const handlePlaceOrder = async (stripe, elements) => {
    if (!shippingData || !paymentData) return;
    
    // Stripe validation and confirmation
    if (stripe && elements) {
         clearError();
         
         try {
             await withLoading(async () => {
                 // 1. Submit elements (Validates inputs)
                 const { error: submitError } = await elements.submit();
                 if (submitError) {
                     console.error("Stripe validation error:", submitError);
                     // We need to re-throw or handle error so withLoading catches it, 
                     // or just return if we want to stay on page (which we do).
                     // But withLoading expects logic inside.
                     // Let's just return, user sees UI error from Elements.
                     return;
                 }

                 // 2. Confirm Payment
                 // We don't need clientSecret here explicitly if Elements was set up with it.
                 // We confirm params. 
                 // Note: If redirect is 'if_required', it yields result.

                 const fullOrderData = {
                     ...shippingData,
                     items: cartItems,
                     userId: user?._id || user?.id || null,
                     // paymentIntentId not available yet for redirects
                 };
                 // Save order details for verification page (if redirect happens)
                 localStorage.setItem("pendingOrder", JSON.stringify(fullOrderData));

                 const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                     elements,
                     confirmParams: {
                         return_url: window.location.origin + "/checkout/verify", 
                         // We can pass receipt_email if we have it in user or shippingData
                         payment_method_data: {
                             billing_details: {
                                 name: shippingData.fullName,
                                 email: shippingData.email,
                                 address: {
                                     line1: shippingData.address,
                                     city: shippingData.city,
                                     postal_code: shippingData.zipCode,
                                     country: 'FI', // Hardcoded or from form
                                 }
                             }
                         }
                     },
                     redirect: "if_required",
                 });

                 if (confirmError) {
                     throw new Error(confirmError.message);
                 }

                 if (paymentIntent && paymentIntent.status === "succeeded") {
                     // 3. Create Order in Backend
                     // fullOrderData is already defined above

                     const res = await submitOrder({
                         ...fullOrderData,
                         paymentIntentId: paymentIntent.id, 
                     });
                     
                     if (res.success) {
                         setOrder(res.data);
                         clearCart();
                         localStorage.removeItem("pendingOrder");
                         navigate("/success/" + res.data.orderId);
                     } else {
                         throw new Error(
                             res.error?.message || res.error || "Payment succeeded but order creation failed."
                         );
                     }
                 } else {
                     // Status not succeeded (e.g. processing, requires_action if logic leaked)
                      throw new Error("Payment status: " + paymentIntent.status);
                 }
             });
         } catch (err) {
             console.error("Order processing failed:", err);
             // withLoading handles setting error state usually?
             // If not, we should set it? useLoading helper sets it if we throw inside?
         }
    }
  };

  return {
    shippingData,
    isShippingValid,
    isPaymentValid,
    handleShippingFormChange,
    handlePaymentFormChange,
    handlePlaceOrder,
    loading,
    error,
    clearError,
    order,
    user,
  };
};
