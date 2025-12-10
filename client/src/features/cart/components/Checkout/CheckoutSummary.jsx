import { useLang } from "/src/hooks/useLang.js";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import RedButton from "/src/components/common/ui/RedButton";
import Spinner from "/src/components/common/ui/Spinner";

const CheckoutSummary = ({
    totalPrice,
    totalItems,
    totalTax,
    error,
    order,
    loading,
    isShippingValid,
    isPaymentValid,
    onPlaceOrderClick
}) => {
    const { t } = useLang();

    return (
        <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
                <OrderSummary
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    totalTax={totalTax}
                    actionButton={
                        <>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    {error.message || error || "Something went wrong"}
                                </div>
                            )}

                            {order && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                                    {t("checkout.orderSuccess") ||
                                        "Order Placed Successfully!"}
                                </div>
                            )}

                            <RedButton
                                fullWidth
                                size="lg"
                                className="font-bold"
                                onClick={onPlaceOrderClick}
                                disabled={
                                    !isShippingValid || !isPaymentValid || loading || order
                                }
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner
                                            size={20}
                                            ringColor="#ffffff40"
                                            spinColor="#ffffff"
                                        />
                                        <span>{t("global.processing")}</span>
                                    </div>
                                ) : (
                                    t("checkout.placeOrder")
                                )}
                            </RedButton>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default CheckoutSummary;
