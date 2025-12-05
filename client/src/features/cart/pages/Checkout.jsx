import { useState, useCallback } from "react";
import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import Dropdown from "/src/components/common/ui/Dropdown";
import ShippingForm from "/src/features/cart/components/ShippingForm";

const Checkout = () => {
  const {
    cartItems,
    deleteCartItem,
    totalItems,
    totalPrice,
    totalTax,
    withoutTax,
  } = useCart();
  const { t } = useLang();
  const [shippingData, setShippingData] = useState(null);
  const [isShippingValid, setIsShippingValid] = useState(false);

  const handleShippingFormChange = useCallback((isValid) => {
    setIsShippingValid(isValid);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl text-center text-red-100 font-bold mb-6 text-gray-800">{t("checkout.title")}</h2>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Dropdown
            title={t("checkout.cartSummary")}
            badge={`${totalItems} ${
              totalItems === 1 ? t("orderSummary.item") : t("orderSummary.items")
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
            badge={
              isShippingValid ? (
                <span className="text-green-500">
                  {t("checkout.proceedPayment")}
                </span>
              ) : (
                <span className="text-red-100">{t("checkout.required")}</span>
              )
            }
            defaultExpanded={true}
          >
            <ShippingForm onFormChange={handleShippingFormChange} />
          </Dropdown>

          <Dropdown
            title={t("checkout.paymentDetails")}
            badge={
              isShippingValid ? (
                <span className="text-red-500">{t("checkout.required")}</span>
              ) : (
                <span className="text-red-100">
                  {t("checkout.fillShippingFirst")}
                </span>
              )
            }
            defaultExpanded={isShippingValid}
            disabled={!isShippingValid}
          ></Dropdown>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <OrderSummary
              totalPrice={totalPrice}
              totalItems={totalItems}
              totalTax={totalTax}
              withoutTax={withoutTax}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
