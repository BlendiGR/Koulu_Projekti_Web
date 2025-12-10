import { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import { useLoading } from "../useLoading";
import { useAuth } from "../../features/auth/hooks/useAuth";

const API = "/api/v1";

export const useOrder = () => {
  const { loading, error, withLoading, setLoadingError } = useLoading();
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const submitOrder = async (orderData) => {
    return await withLoading(async () => {
      const res = await fetchData(`${API}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          destinationAddress: orderData.fullAddress,
          phone: orderData.phone,
          products: orderData.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity || 1,
          })),
          ...(orderData.couponId ? { couponId: orderData.couponId } : {}),
          ...(orderData.paymentIntentId ? { paymentIntentId: orderData.paymentIntentId } : {}),
        }),
      });

      if (!res.success) {
        throw new Error(res.error?.message || "Order submission failed");
      }

      setOrder(res.data);
      return res;
    });
  };

  const getOrderById = async (orderId) => {
    const res = await fetchData(`${API}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.success) {
      throw new Error(res.error?.message || "Order not found");
    }

    return res.data;
  };

  return { submitOrder, loading, error, order, getOrderById };
};
