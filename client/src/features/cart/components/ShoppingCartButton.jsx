import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "/src/hooks/useLang";
import { useCart } from "/src/features/cart/hooks/useCart.js";

const ShoppingCartButton = () => {
  const { t } = useLang();
  const { totalItems } = useCart();

  return (
    <>
      <Link
        to="/cart"
        className={`relative bg-red-100 hover:bg-red-200 active:hover:bg-red-200 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer min-w-[110px]`}
      >
        <ShoppingCart />
        {t("cart.button")}
        <div>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </>
  );
};

export default ShoppingCartButton;
