import { ShoppingCart } from "lucide-react";
import { useLang } from "/src/hooks/useLang";
import { useCart } from "/src/features/cart/hooks/useCart.js";

const ShoppingCartButton = ({ onClick, mobile = false }) => {
  const { t } = useLang();
  const { totalItems } = useCart();

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
    <button
      onClick={onClick}
      className="relative bg-red-100 hover:bg-red-200 active:hover:bg-red-200 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer min-w-[110px]"
    >
      <ShoppingCart />
      {t("cart.button")}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-black-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default ShoppingCartButton;
