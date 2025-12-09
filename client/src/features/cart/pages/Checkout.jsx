import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import { useOrder } from "/src/hooks/apiHooks";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import Dropdown from "/src/components/common/ui/Dropdown";
import ShippingForm from "/src/features/cart/components/ShippingForm";
import RedButton from "/src/components/common/ui/RedButton";
import Spinner from "/src/components/common/ui/Spinner";
import { X, Check } from "lucide-react";

const Checkout = () => {
  const {
    cartItems,
    deleteCartItem,
    totalItems,
    totalPrice,
    totalTax,
    withoutTax,
    clearCart,
  } = useCart();
  const { t } = useLang();
  const { submitOrder, loading, error, order } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  const [shippingData, setShippingData] = useState(null);

  const handleShippingFormChange = useCallback((isValid, data) => {
    setIsShippingValid(isValid);
    setShippingData(data);
  }, []);

  const handlePlaceOrder = async () => {
    if (!shippingData) return;

    const fullOrderData = {
        ...shippingData,
        items: cartItems,
        userId: user?._id || user?.id || null
    };

    const res = await submitOrder(fullOrderData);

    if (res.success) {
      clearCart();
      navigate("/success/" + res.data.data.orderId);
      return;
    } 
    
    setLoadingError(res.error);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-[calc(100vh-5rem)]">
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
            rightLabel={`${t("checkout.customer")}: ${user?.username}`}
            badge={
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
            badge={
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
                actionButton={
                  <>
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                         {error.message || "Something went wrong"}
                      </div>
                    )}
                    
                    {order && (
                         <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                            {t("checkout.orderSuccess") || "Order Placed Successfully!"}
                         </div>
                    )}

                    <RedButton
                      fullWidth
                      size="lg"
                      onClick={handlePlaceOrder}
                      disabled={!isShippingValid || loading || order}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spinner size={20} ringColor="#ffffff40" spinColor="#ffffff" />
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
export default Checkout;
