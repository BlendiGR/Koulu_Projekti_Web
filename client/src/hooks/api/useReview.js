import { fetchData } from "../../utils/fetchData";

const API = "/api/v1";

export const useReview = () => {
    const getReviews = async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        const url = qs ? `${API}/reviews?${qs}` : `${API}/reviews`;
        const res = await fetchData(url);

        if (!res.success) return res;

        return { success: true, data: res.data };
    };

    const createReview = async (reviewData) => {
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetchData(`${API}/reviews`, {
            method: "POST",
            headers,
            body: JSON.stringify(reviewData),
        });

        if (!res.success) return res;

        return { success: true, data: res.data };
    };

    const updateReview = async (reviewId, reviewData, token) => {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetchData(`${API}/reviews/${reviewId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(reviewData),
        });

        if (!res.success) return res;

        return { success: true, data: res.data };
    };

    const deleteReview = async (reviewId, token) => {
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetchData(`${API}/reviews/${reviewId}`, {
            method: "DELETE",
            headers,
        });

        if (!res.success) return res;

        return { success: true, data: res.data };
    };

    return {getReviews, createReview, updateReview, deleteReview};
};