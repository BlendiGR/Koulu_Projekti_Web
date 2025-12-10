import { CheckCircle } from "lucide-react";
import { useLang } from "/src/hooks/useLang.js";
import { useNavigate } from "react-router-dom";
import RedButton from "/src/components/common/ui/RedButton";

const ThankYouForReview = () => {
    const { t } = useLang();
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center animate-fade-in">
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                            <CheckCircle 
                                size={80} 
                                className="text-green-500 relative animate-scale-in" 
                                strokeWidth={2}
                            />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-up">
                        {t("review.thankYou.title")}
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 animate-slide-up animation-delay-100">
                        {t("review.thankYou.message")}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-full animate-expand"></div>
                    <p className="text-sm text-gray-500 mb-8 animate-slide-up animation-delay-200">
                        {t("review.thankYou.subtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-300">
                        <RedButton
                            onClick={() => navigate("/")}
                            className="px-8 py-3 text-base font-semibold"
                        >
                            {t("review.thankYou.backHome")}
                        </RedButton>
                        <button
                            onClick={() => navigate("/menu")}
                            className="px-8 py-3 text-base font-semibold border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                        >
                            {t("review.thankYou.viewMenu")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouForReview;