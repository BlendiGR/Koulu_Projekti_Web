import { useForm } from "react-hook-form";
import { useLang } from "/src/hooks/useLang.js";
import { useState } from "react";
import RedButton from "/src/components/common/ui/RedButton";
import { Search, Check } from 'lucide-react';
import { useLoading } from "/src/hooks/useLoading.js";
import { useCoupon } from "/src/hooks/api";
import { couponSchema } from "/src/schemas/couponSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "/src/components/common/ui/Spinner";
import { useCart } from "/src/features/cart/hooks/useCart.js";

const CouponChecker = () => {
    const { checkCoupon } = useCoupon();
    const { applyCoupon } = useCart();
    const { t } = useLang();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(couponSchema),
    });
    const { withLoading, error, loading } = useLoading();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        setSuccess(false);
        await withLoading(async () => {
            const coupon = await checkCoupon(data.coupon);
            console.log(coupon);
            if (!coupon) {
                throw new Error(t("cart.coupon.notFound"));
            }
            applyCoupon(coupon);
        });
        setSuccess(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex  items-center justify-center w-full bg-beige rounded-3xl border border-brown-100 p-4">
                <div className="w-full">
                    <label
                    htmlFor="coupon"
                    className="block text-md font-bold text-gray-700"
                    >
                    {t("cart.coupon.label")}
                    </label>
                    {(errors.coupon || error) && (
                            <p className="py-1 text-sm text-red-600">
                                {errors.coupon?.message || error}
                            </p>
                        )}
                    <div className="relative">
                        <input
                            type="text"
                            id="coupon"
                            {...register("coupon")}
                            className="relative bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pr-12"
                        />
                        <RedButton
                            type="submit"
                            size="sm"
                            className="absolute inset-y-0 right-0 m-1 flex items-center justify-center"
                        >   
                            {success ? <Check /> : loading ? <Spinner size={22} spinColor="black" /> : <Search />}
                        </RedButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CouponChecker;
