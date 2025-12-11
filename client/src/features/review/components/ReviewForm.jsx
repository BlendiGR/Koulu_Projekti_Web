import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLang } from "/src/hooks/useLang.js";
import { reviewSchema } from "/src/schemas/reviewSchema.js";
import ReviewStars from "./ReviewStars";
import RedButton from "/src/components/common/ui/RedButton";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import { useLoading } from "/src/hooks/useLoading";
import { useReview } from "/src/hooks/api";

const ReviewForm = ({ setIsSuccess }) => {
    const { t } = useLang();
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const { withLoading, loading, setLoadingError } = useLoading();
    const { createReview } = useReview();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(reviewSchema(t)),
        defaultValues: {
            reviewer: user?.username || "",
            rating: 5,
            review: "",
        },
    });

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setValue("rating", newRating, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");
        withLoading(async () => {
            const res = await createReview(user?.userId, data, token);
            if (!res.success) {
                setLoadingError(res.error);
                return;
            }
            setIsSuccess(true);
            reset();
        });
    };

    return (
        <div className="mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {t("review.form.title")}
                </h2>
                <p className="text-gray-600 mb-8">
                    {t("review.form.subtitle")}
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            {t("review.form.ratingLabel")}
                        </label>
                        <ReviewStars value={rating} onChange={handleRatingChange} size={48} />
                        {errors.rating && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.rating.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="reviewer"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            {t("review.form.nameLabel")}
                        </label>
                        <input
                            type="text"
                            id="reviewer"
                            {...register("reviewer")}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-all duration-200"
                            placeholder={t("review.form.namePlaceholder")}
                        />
                        {errors.reviewer && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.reviewer.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="review"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            {t("review.form.reviewLabel")}
                        </label>
                        <textarea
                            id="review"
                            {...register("review")}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 focus:outline-none transition-all duration-200 resize-none"
                            placeholder={t("review.form.reviewPlaceholder")}
                        />
                        {errors.review && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.review.message}
                            </p>
                        )}
                    </div>
                    <div className="pt-4">
                        <RedButton
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 text-lg font-semibold"
                        >
                            {loading ? t("review.form.submitting") : t("review.form.submitButton")}
                        </RedButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;