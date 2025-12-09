
import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useCheckout } from "/src/features/cart/hooks/useCheckout.js";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import Dropdown from "/src/components/common/ui/Dropdown";
import ShippingForm from "/src/features/cart/components/ShippingForm";
import PaymentForm from "/src/features/cart/components/PaymentForm";
import RedButton from "/src/components/common/ui/RedButton";
import Spinner from "/src/components/common/ui/Spinner";
import { X, Check } from "lucide-react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import StripePaymentWrapper from "/src/features/cart/components/StripePaymentWrapper";

const CheckoutContent = () => {
    const {
        cartItems,
        deleteCartItem,
        totalItems,
        totalPrice,
        totalTax,
        withoutTax,
    } = useCart();
    const { t } = useLang();

    const {
        isShippingValid,
        isPaymentValid,
        handleShippingFormChange,
        handlePaymentFormChange,
        handlePlaceOrder,
        loading,
        error,
        order,
    } = useCheckout();
    
    const stripe = useStripe();
    const elements = useElements();

    const onPlaceOrderClick = () => {
        handlePlaceOrder(stripe, elements);
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-5rem)]">
            <h2 className="text-3xl text-center text-red-100 font-bold py-6 ">
                {t("checkout.title")}
            </h2>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Dropdown
                        title={t("checkout.cartSummary")}
                        badge={`${totalItems} ${
                            totalItems === 1
                                ? t("orderSummary.item")
                                : t("orderSummary.items")
                        }`}
                        rightLabel={`${totalPrice.toFixed(2)} €`}
                        defaultExpanded={false}
                    >
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">
                                {t("checkout.emptyCart")}
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item, index) => (
                                    <CartProductSummary
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        deleteCartItem={deleteCartItem}
                                        cartItems={cartItems}
                                    />
                                ))}
                            </div>
                        )}
                    </Dropdown>

                    <Dropdown
                        title={t("checkout.shippingDetails")}
                        rightLabel={
                            isShippingValid ? (
                                <span className="text-green-500">
                                    <Check className="w-5 h-5" />
                                </span>
                            ) : (
                                <span className="text-red-100">
                                    <X className="w-5 h-5" />
                                </span>
                            )
                        }
                        defaultExpanded={true}
                    >
                        <ShippingForm onFormChange={handleShippingFormChange} />
                    </Dropdown>

                    <Dropdown
                        title={t("checkout.paymentDetails")}
                        rightLabel={
                            isPaymentValid ? (
                                <span className="text-green-500">
                                    <Check className="w-5 h-5" />
                                </span>
                            ) : (
                                <span className="text-red-100">
                                    <X className="w-5 h-5" />
                                </span>
                            )
                        }
                        disabled={!isShippingValid}
                    >
                        <PaymentForm onFormChange={handlePaymentFormChange} />
                    </Dropdown>
                </div>

                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8">
                        <OrderSummary
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            totalTax={totalTax}
                            withoutTax={withoutTax}
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
            </div>
        </div>
    );
};

const Checkout = () => {
    const { cartItems } = useCart();
    const { t } = useLang();

    if (cartItems.length === 0) {
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
    }

    return (
        <div className="min-h-[calc(100vh-5rem)]">
            <StripePaymentWrapper>
                <CheckoutContent />
            </StripePaymentWrapper>
        </div>
    )
}

export default Checkout;
