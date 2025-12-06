import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "/src/hooks/useLang.js";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import CartProductSummary from "/src/features/cart/components/CartProductSummary";
import OrderSummary from "/src/features/cart/components/OrderSummary";
import RedButton from "/src/components/common/ui/RedButton";
import { useAuth } from "/src/features/auth/hooks/useAuth";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const {
    cartItems,
    deleteCartItem,
    totalItems,
    totalPrice,
    totalTax,
    withoutTax,
  } = useCart();

  const { user } = useAuth();

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-999 bg-black/30 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brown-100">
          <h2 className="text-2xl font-bold text-gray-800">
             {t("cart.shoppingCart")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-black-200 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Tilaus tuotteet */}
        <div
          className="flex-1 overflow-y-auto p-6 relative"
          style={{
            background: `
              linear-gradient(white 30%, rgba(255,255,255,0)),
              linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,
              radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.15), rgba(0,0,0,0)),
              radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.15), rgba(0,0,0,0)) 0 100%
            `,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 40px, 100% 40px, 100% 14px, 100% 14px",
            backgroundAttachment: "local, local, scroll, scroll",
          }}
        >
          {cartItems.length === 0 ? (
            <div className="bg-beige p-8 rounded-3xl border border-brown-100 text-center">
              <p className="text-xl text-gray-600">{t("cart.empty")}</p>
            </div>
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
        </div>

        {/* Tilaus yhteenveto */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-brown-100">
            <OrderSummary
              totalItems={totalItems}
              withoutTax={withoutTax}
              totalTax={totalTax}
              totalPrice={totalPrice}
              actionButton={
                user ? (
                  <RedButton
                  fullWidth
                  size="lg"
                  onClick={handleCheckout}
                >
                  {t("cart.proceedCheckout")}
                </RedButton>  
                ) : (
                  <RedButton
                  fullWidth
                  size="lg"
                  onClick={handleLogin}
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
