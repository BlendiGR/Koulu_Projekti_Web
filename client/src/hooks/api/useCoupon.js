import { fetchData } from "../../utils/fetchData";


export const useCoupon = () => {
    const checkCoupon = async (couponCode) => {
        const res = await fetchData(`/api/v1/coupons/${couponCode}`, {
            method: "GET",
        });
        if (!res.success) {
            return null;
        }
        return res.data;
    }

    const createCoupon = async (couponData) => {
        const res = await fetchData(`/api/v1/coupons`, {
            method: "POST",
            body: JSON.stringify(couponData),
        });
        if (!res.success) {
            return null;
        }
        return res.data;
    }
    
    const deleteCoupon = async (couponId) => {
        const res = await fetchData(`/api/v1/coupons/${couponId}`, {
            method: "DELETE",
        });
        if (!res.success) {
            return null;
        }
        return res.data;
    }
    
    return {
        checkCoupon,
        createCoupon,
        deleteCoupon,
    };
};