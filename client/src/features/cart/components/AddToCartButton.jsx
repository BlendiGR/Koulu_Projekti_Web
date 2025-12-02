import { useCart } from "/src/features/cart/hooks/useCart.js";
import { toast } from "sonner";
import { useLang } from "/src/hooks/useLang";

const AddToCartButton = ({ item }) => {
  const { addCartItem } = useCart();
  const { t } = useLang();

  const handleClick = () => {
    toast(
      <span className="md:text-xl text-lg">
        <span className="text-red-200 font-semibold">{item.name}</span>{" "}
        {t("cart.addedtocart")}
      </span>
    );
    addCartItem(item);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
      >
        {t("cart.addtocart")}
      </button>
    </>
  );
};

export default AddToCartButton;
