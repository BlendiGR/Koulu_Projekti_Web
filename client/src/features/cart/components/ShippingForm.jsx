import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {useLang } from "/src/hooks/useLang.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryInfoSchema } from "/src/schemas/deliveryInfoSchema.js";

const ShippingForm = ({ onFormChange }) => {
    const { t } = useLang();
    const { register, watch, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(deliveryInfoSchema(t)),
        mode: "onChange",
        defaultValues: {
            phone: "+358"
        }
    });

    useEffect(() => {
        onFormChange(isValid, formValues);
    }, [isValid]);


    const formValues = watch();
    
    return (
        <div>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            {t("form.firstName.label")}
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            {...register("firstName")}
                            className="bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.firstName && (
                            <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            {t("form.lastName.label")}
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            {...register("lastName")}
                            className="bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.lastName && (
                            <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            {t("form.phone.label")}
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register("phone")}
                            className="bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                            {t("form.street.label")}
                        </label>
                        <input
                            type="text"
                            id="street"
                            {...register("street")}
                            className="bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.street && (
                            <p className="mt-2 text-sm text-red-600">{errors.street.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            {t("form.postalCode.label")}
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            {...register("postalCode")}
                            className="bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.postalCode && (
                            <p className="mt-2 text-sm text-red-600">{errors.postalCode.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            {t("form.city.label")}
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register("city")}
                            className="bg-white p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.city && (
                            <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
                        )}
                    </div>
                    
                </div>
            </form>
        </div>
    );
};

export default ShippingForm;
