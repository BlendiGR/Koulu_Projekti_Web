import { useLang } from "/src/hooks/useLang.js";

const CheckoutEmpty = () => {
    const { t } = useLang();

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-5rem)]">
            <h2 className="text-3xl text-center text-red-100 font-bold py-6 ">
                {t("checkout.title")}
            </h2>
            <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-lg border border-white/10">
                <p className="text-center text-gray-400 text-lg mb-6">
                    {t("checkout.emptyCart")}
                </p>
                <a href="/menu" className="px-6 py-2 bg-red-600 rounded-full text-white font-bold hover:bg-red-700 transition">
                    {t("global.backToMenu") || "Back to Menu"} 
                </a>
            </div>
        </div>
    );
};

export default CheckoutEmpty;
