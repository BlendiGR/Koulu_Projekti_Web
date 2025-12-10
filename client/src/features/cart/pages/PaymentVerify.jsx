import { useLang } from "/src/hooks/useLang.js";

const PaymentVerify = () => {
    const { t } = useLang();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h2 className="text-xl font-bold text-gray-800">
                {t("payment.processing") || "Processing payment..."}
            </h2>
            <p className="text-gray-500">
                {t("payment.pleaseWait") || "Please wait while we verify your payment."}
            </p>
        </div>
    );
};

export default PaymentVerify;
