import { Trash2 } from "lucide-react";
import { useLang } from "/src/hooks/useLang.js";

const CartProductSummary = ({ item, index, deleteCartItem, cartItems }) => {
  const { t } = useLang();
  return (
    <div key={item.id}>
      <div className="flex flex-row items-center gap-4 md:gap-6">
        <img
          src={"/" + item.imageUrl}
          alt={item.name}
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl shadow-sm"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
            <button
              onClick={() => deleteCartItem(item.id)}
              className="text-red-400 hover:text-red-600 transition-colors p-2 cursor-pointer"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
              <span className="text-sm text-gray-600">{t("cart.quantity")}:</span>
              <span className="font-semibold">{item.quantity}</span>
            </div>
            <p className="font-bold text-lg text-gray-800">
              {item.cost
                ? `${(item.cost * item.quantity).toFixed(2)} €`
                : "10.00 €"}
            </p>
          </div>
        </div>
      </div>
      {index < cartItems.length - 1 && (
        <hr className="mt-6 border-brown-100/50" />
      )}
    </div>
  );
};
export default CartProductSummary;