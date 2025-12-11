import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import RedButton from "/src/components/common/ui/RedButton";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import CouponChecker from "/src/features/cart/components/CouponChecker";
import { useEffect } from "react";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const {
    cartItems,
    deleteCartItem,
    totalItems,
    totalPrice,
    totalTax,
  } = useCart();

  const { user } = useAuth();

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const handleLogin = () => {
    navigate("/checkout");
    onClose();
  };

   useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-999 bg-black/40 transition-opacity duration-300 overflow-y-auto ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 right-0 min-h-full w-full md:w-[450px] transition-transform duration-300 bg-beige ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-brown-100">
          <h2 className="text-2xl font-bold text-gray-800">
            {t("cart.shoppingCart")}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            title="Close cart"
            className="p-2 text-black-200 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={28} />
          </button>
        </div>
        <div
          className="flex-1 p-6 relative"
        >
          {cartItems.length === 0 ? (
            <div className="bg-beige p-8 rounded-3xl border border-brown-100 text-center">
              <p className="text-xl text-gray-600">{t("cart.empty")}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <CartProductSummary
                  key={item.productId}
                  item={item}
                  index={index}
                  deleteCartItem={deleteCartItem}
                  cartItems={cartItems}
                />
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="flex flex-col gap-4 p-6 border-t border-brown-100">
            <CouponChecker />
            <OrderSummary
              totalItems={totalItems}
              totalTax={totalTax}
              totalPrice={totalPrice}
              actionButton={
                user ? (
                  <RedButton
                    fullWidth
                    size="lg"
                    className="font-semibold"
                    onClick={handleCheckout}
                  >
                    {t("cart.proceedCheckout")}
                  </RedButton>
                ) : (
                  <RedButton
                    fullWidth
                    size="lg"
                    onClick={handleLogin}
                    className="font-semibold"
                  >
                    {t("cart.loginToCheckout")}
                  </RedButton>
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
