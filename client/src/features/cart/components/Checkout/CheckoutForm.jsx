import { useLang } from "/src/hooks/useLang.js";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import Dropdown from "/src/components/common/ui/Dropdown";
import ShippingForm from "/src/features/cart/components/ShippingForm";
import PaymentForm from "/src/features/cart/components/PaymentForm";
import { X, Check } from "lucide-react";

const CheckoutForm = ({ 
    cartItems, 
    totalItems, 
    totalPrice, 
    deleteCartItem, 
    isShippingValid, 
    isPaymentValid, 
    handleShippingFormChange, 
    handlePaymentFormChange 
}) => {
    const { t } = useLang();

    return (
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
                disabled={!isShippingValid}
            >
                <PaymentForm onFormChange={handlePaymentFormChange} />
            </Dropdown>
        </div>
    );
};

export default CheckoutForm;
