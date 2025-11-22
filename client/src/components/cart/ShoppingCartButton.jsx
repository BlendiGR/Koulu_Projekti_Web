import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ShoppingCartButton = ({ items }) => {
  return (
    <>
      <Link
        to="/cart"
        className={`bg-red-100 hover:bg-red-200 active:hover:bg-red-200 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer min-w-[110px]`}
      >
        <ShoppingCart />
        Cart
        <div>
          {items > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
              {items}
            </span>
          )}
        </div>
      </Link>
    </>
  );
};

export default ShoppingCartButton;
