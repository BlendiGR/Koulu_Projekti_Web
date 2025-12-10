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
// --------------------------
// PRODUCT HOOKS
// --------------------------
export const useProduct = () => {
  const getProducts = async (params = {}) => {
    // build query string
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `${API}/products?${qs}` : `${API}/products`;
    console.log(qs);
    const res = await fetchData(url);
    if (!res.success) return res;
    // unwrap server envelope: server returns { success: true, data: <payload> }
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;

    console.table(payload);

    return { success: true, data: payload };
  };

  const createProduct = async (productData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(productData),
    });

    if (!res.success) return res;
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
    return { success: true, data: payload };
  };

  const updateProduct = async (productId, productData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/products/${productId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(productData),
    });

    if (!res.success) return res;
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
    return { success: true, data: payload };
  };

  const deleteProduct = async (productId, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/products/${productId}`, {
      method: "DELETE",
      headers,
    });

    if (!res.success) return res;
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
    return { success: true, data: payload };
  };

  return { getProducts, createProduct, updateProduct, deleteProduct };
};

// --------------------------
// REVIEW HOOKS
// --------------------------
export const useReview = () => {
  const getReviews = async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `${API}/reviews?${qs}` : `${API}/reviews`;
    const res = await fetchData(url);
    if (!res.success) return res;
    // unwrap server envelope: server returns { success: true, data: <payload> }
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;

    console.table(payload);

    return { success: true, data: payload };
  };

  const createReview = async (reviewData, token) => {

  };

  const updateReview = async (reviewId, reviewData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/reviews/${reviewId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(reviewData),
    });

    console.log("data to update:",reviewData);


    if (!res.success) return res;
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;

    console.log("received data: ", payload);
    return { success: true, data: payload };
  };

  const deleteReview = async (reviewId, token) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetchData(`${API}/reviews/${reviewId}`, {
      method: "DELETE",
      headers,
    });

    if (!res.success) return res;
    const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
    return { success: true, data: payload };
  };

  return {getReviews, createReview, updateReview, deleteReview};
};