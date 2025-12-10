import { fetchData } from "../../utils/fetchData";


export const useCoupon = () => {
    const getCoupons = async () => {
        const token = localStorage.getItem("token");
        const res = await fetchData(`/api/v1/coupons`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (!res.success) {
            return res;
        }
        return {success: true, data: res.data};
    }
    const checkCoupon = async (couponCode) => {
        const res = await fetchData(`/api/v1/coupons/${couponCode}`, {
            method: "GET",
        });
        if (!res.success) {
            return null;
        }
        return res.data;
    }

    const createCoupon = async (couponData, token) => {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetchData(`/api/v1/coupons`, {
            method: "POST",
            headers,
            body: JSON.stringify(couponData),
        });
        if (!res.success) return res;

        return {success: true, data: res.data};
    }
    
    const deleteCoupon = async (couponId, token) => {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetchData(`/api/v1/coupons/${couponId}`, {
            method: "DELETE",
            headers,
        });
        if (!res.success) return res;

        return {success: true, data: res.data};
    }
    
    return {
        getCoupons,
        checkCoupon,
        createCoupon,
        deleteCoupon,
    };
};