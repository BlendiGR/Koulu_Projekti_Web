import { useCart } from "/src/features/cart/hooks/useCart.js";
import { toast } from "sonner";
import { useLang } from "/src/hooks/useLang";

const AddToCartButton = ({ item, quantity = 1 }) => {
  const { addCartItem } = useCart();
  const { t } = useLang();

  const handleClick = (e) => {
    e.stopPropagation();
    toast(
      <span className="md:text-xl text-lg">
        <span className="text-red-200 font-semibold">{item.name}</span>{" "}
        {t("cart.addedtocart")}
      </span>
    );
    addCartItem(item, quantity);
  };
  return (
    <>
      <button
        onClick={(e) => handleClick(e)}
        className="flex justify-center text-center text-white text-md font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
      >
        {t("cart.addtocart")}
      </button>
    </>
  );
};

export default AddToCartButton;