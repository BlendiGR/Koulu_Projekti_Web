import { fetchData } from "/src/utils/fetchData";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLoading } from "/src/hooks/useLoading";
import { useAuth } from "/src/features/auth/hooks/useAuth";

const API = "/api/v1";

// --------------------------
// USER HOOK
// --------------------------
export const useUser = () => {
  const navigate = useNavigate();

  const postLogin = async (inputs) => {
    return await fetchData(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  const postUser = async (inputs) => {
    return await fetchData(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  const getUserByToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        error: { message: "Unauthorized", code: "NO_TOKEN" },
      };
    }

    const res = await fetchData(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.success) {
      localStorage.removeItem("token");
      navigate("/login");
    }

    return res;
  };

  return { postLogin, postUser, getUserByToken };
};
// --------------------------
// FILE HOOK
// --------------------------
export const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetchData(`${API}/media/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res;
  };

  return { postFile };
};
// --------------------------
// ORDER HOOK
// --------------------------

export const useOrder = () => {
  const { loading, error, withLoading, setLoadingError } = useLoading();
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const submitOrder = async (orderData) => {
    const { fullAddress, items } = orderData;
    return await withLoading(async () => {
      const res = await fetchData(`${API}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          destinationAddress: fullAddress,
          products: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity || 1,
          })),
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
