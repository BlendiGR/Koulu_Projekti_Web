import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useCheckout } from "/src/features/cart/hooks/useCheckout.js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import StripePaymentWrapper from "/src/features/cart/components/StripePaymentWrapper";
import CheckoutEmpty from "/src/features/cart/components/Checkout/CheckoutEmpty";
import CheckoutForm from "/src/features/cart/components/Checkout/CheckoutForm";
import CheckoutSummary from "/src/features/cart/components/Checkout/CheckoutSummary";

const CheckoutContent = () => {
    const {
        cartItems,
        deleteCartItem,
        totalItems,
        totalPrice,
        totalTax,
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
                <CheckoutForm 
                    cartItems={cartItems}
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                    deleteCartItem={deleteCartItem}
                    isShippingValid={isShippingValid}
                    isPaymentValid={isPaymentValid}
                    handleShippingFormChange={handleShippingFormChange}
                    handlePaymentFormChange={handlePaymentFormChange}
                />

                <CheckoutSummary 
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    totalTax={totalTax}
                    error={error}
                    order={order}
                    loading={loading}
                    isShippingValid={isShippingValid}
                    isPaymentValid={isPaymentValid}
                    onPlaceOrderClick={onPlaceOrderClick}
                />
            </div>
        </div>
    );
};

const Checkout = () => {
    const { cartItems } = useCart();

    if (cartItems.length === 0) {
        return <CheckoutEmpty />;
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
