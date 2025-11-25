import { useCart } from "../../hooks/useCart";
import { toast } from "sonner";

const AddToCartButton = ({ item }) => {
  const { addCartItem } = useCart();

  const handleClick = (e) => {
    toast(item.title + " Added To Cart! bitch ass nigga");
    addCartItem(item.id);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
      >
        Add To Cart
      </button>
    </>
  );
};

export default AddToCartButton;
