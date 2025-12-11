import { useState } from "react";
import { fetchData } from "../../utils/fetchData";
import { useLoading } from "../useLoading";
import { useAuth } from "../../features/auth/hooks/useAuth";

const API = "/api/v1";

export const useOrder = () => {
    const {loading, error, withLoading, setLoadingError} = useLoading();
    const [order, setOrder] = useState(null);
    const token = localStorage.getItem("token");
    const {user} = useAuth();

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
                        productId: item.productId,
                        quantity: item.quantity || 1,
                    })),
                    ...(orderData.couponId ? {couponId: orderData.couponId} : {}),
                    ...(orderData.paymentIntentId ? {paymentIntentId: orderData.paymentIntentId} : {}),
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

    // 🔹 UUSI: hae kirjautuneen käyttäjän kaikki tilaukset
    const getOrdersByUser = async () => {
        if (!user) {
            throw new Error("User not authenticated");
        }

        const res = await fetchData(`${API}/users/${user.userId}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.success) {
            throw new Error(res.error?.message || "Failed to fetch orders");
        }

        return res.data;
    };

    // Admin hooks
    const getOrdersAdmin = async (params) => {
        const qs = new URLSearchParams(params).toString();
        const url = qs ? `${API}/orders?${qs}` : `${API}/orders`;
        const token = localStorage.getItem("token");
        const res = await fetchData(url, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (!res.success) return res;

        return {success: true, data: res.data};
    }

    const updateOrder = async (orderId, orderData, token) => {
        const headers = {"Content-Type": "application/json"};
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetchData(`${API}/orders/${orderId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(orderData),
        });

        if (!res.success) return res;

        return {success: true, data: res.data};
    }

    return { submitOrder, loading, error, order, getOrderById, getOrdersByUser, getOrdersAdmin, updateOrder };
};