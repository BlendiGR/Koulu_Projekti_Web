import { useForm } from "react-hook-form";
import { deliveryInfoSchema } from "/src/schemas/deliveryInfoSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";

const ShippingForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(deliveryInfoSchema),
    });
    return (
        <div>
            <form onSubmit={handleSubmit()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            {...register("firstName")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.firstName && (
                            <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            {...register("lastName")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.lastName && (
                            <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register("phone")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                            Street
                        </label>
                        <input
                            type="text"
                            id="street"
                            {...register("street")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.street && (
                            <p className="mt-2 text-sm text-red-600">{errors.street.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            {...register("postalCode")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.postalCode && (
                            <p className="mt-2 text-sm text-red-600">{errors.postalCode.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register("city")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
