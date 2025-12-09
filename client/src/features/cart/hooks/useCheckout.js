import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useOrder } from "/src/hooks/apiHooks";
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

  const handlePlaceOrder = async () => {
    if (!shippingData || !paymentData) return;

    clearError();

    const fullOrderData = {
      ...shippingData,
      items: cartItems,
      userId: user?._id || user?.id || null,
    };

    try {
      await withLoading(async () => {
        const res = await submitOrder(fullOrderData);
        if (res.success) {
          setOrder(res.data);
          clearCart();
          navigate("/success/" + res.data.orderId);
        } else {
          throw new Error(
            res.error?.message || res.error || "Failed to place order"
          );
        }
      });
    } catch (err) {
      console.error("Order placement failed:", err);
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
