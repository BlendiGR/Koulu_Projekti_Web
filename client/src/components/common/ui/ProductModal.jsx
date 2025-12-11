import { X } from "lucide-react";
import AddToCartButton from "/src/features/cart/components/AddToCartButton.jsx";
import { useState } from "react";
import { useLang } from "/src/hooks/useLang";

const ProductModal = ({ isOpen, onClose, product }) => {

  const [quantity, setQuantity] = useState(1);
  const { t } = useLang();
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-beige rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto flex flex-col md:flex-row">
          <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white active:bg-gray-300 cursor-pointer z-20 shadow-sm"
          >
            <X size={24} className="text-gray-600" />
          </button>

          {/* Left: image */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
            <div className="w-full h-64 md:h-[360px] relative">
              <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h2>
            <p className="text-2xl font-bold text-green-600 mb-4">
              {product.cost}€
            </p>

            {product.ingredients && product.ingredients.length > 0 && (
                <div className="my-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white text-brown-200 rounded-full text-sm"
                        >
                    {ingredient}
                  </span>
                    ))}
                  </div>
                </div>
            )}

            {product.diets && product.diets.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.diets.map((diet, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-white rounded-full text-sm font-medium"
                        >
                    {diet}
                  </span>
                    ))}
                  </div>
                </div>
            )}

            <div className="mt-2">
              <div className="flex items-center justify-start gap-2">
                <p className="text-lg font-semibold">{t("cart.quantity")}</p>
                <button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="bg-gray-100 hover:bg-gray-300 disabled:opacity-50 text-2xl text-black px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="text-2xl font-semibold">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-100 hover:bg-gray-300 text-2xl text-black px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <AddToCartButton item={product} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductModal;