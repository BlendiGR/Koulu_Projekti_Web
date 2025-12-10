import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useOrder } from "/src/hooks/api";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import { useLoading } from "/src/hooks/useLoading.js";

export const useCheckout = () => {
  const { cartItems, appliedCoupon, clearCart } = useCart();
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
    
    if (stripe && elements) {
         clearError();
         
         try {
             await withLoading(async () => {
                 const { error: submitError } = await elements.submit();
                 if (submitError) {
                     console.error("Stripe validation error:", submitError);
                     return;
                 }

                 const fullOrderData = {
                     ...shippingData,
                     items: cartItems,
                     userId: user?._id || user?.id || null,
                     ...(appliedCoupon ? { couponId: appliedCoupon.id } : {}),
                 };

                 console.log(fullOrderData);
                 const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                     elements,
                     confirmParams: {
                         return_url: window.location.origin + "/checkout/verify", 
                         payment_method_data: {
                             billing_details: {
                                 name: shippingData.fullName,
                                 email: shippingData.email,
                                 address: {
                                     line1: shippingData.address,
                                     city: shippingData.city,
                                     postal_code: shippingData.zipCode,
                                     country: 'FI',
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
                     const res = await submitOrder({
                         ...fullOrderData,
                         paymentIntentId: paymentIntent.id,
                     });
                     
                     if (res.success) {
                         setOrder(res.data);
                         clearCart();
                         navigate("/success/" + res.data.orderId);
                     } else {
                         throw new Error(
                             res.error?.message || res.error || "Payment succeeded but order creation failed."
                         );
                     }
                 } else {
                      throw new Error("Payment status: " + paymentIntent.status);
                 }
             });
         } catch (err) {
             console.error("Order processing failed:", err);
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
