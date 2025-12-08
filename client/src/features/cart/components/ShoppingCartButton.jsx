import { ShoppingCart } from "lucide-react";
import { useLang } from "/src/hooks/useLang";
import { useCart } from "/src/features/cart/hooks/useCart.js";
import RedButton from "/src/components/common/ui/RedButton";

const ShoppingCartButton = ({ onClick, mobile = false }) => {
  const { t } = useLang();
  const { totalItems, totalPrice } = useCart();

  if (mobile) {
    return (
      <button
        onClick={onClick}
        className="relative text-current p-2"
      >
        <ShoppingCart size={28} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-100 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
      </button>
    );
  }

  return (
    <RedButton
      onClick={onClick}
      size="sm"
      className="relative flex items-center justify-center gap-1 min-w-[120px]"
    >
      <ShoppingCart />
      <p className="text-lg font-medium">{t("cart.button")} {totalPrice > 0 ? totalPrice.toFixed(2) + " €" : ""}</p>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-black-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
          {totalItems}
        </span>
      )}
    </RedButton>
  );
};

export default ShoppingCartButton;
