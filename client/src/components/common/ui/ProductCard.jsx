import AddToCartButton from "/src/features/cart/components/AddToCartButton.jsx";
import ProductModal from "/src/components/common/ui/ProductModal.jsx";
import { useState, useEffect } from "react";

const ProductCard = ({ item = {}, rank = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleCardClick = () => setIsOpen(true);

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
  };

  const renderIngredients = () => {
    const data = item.ingredients;
    if (!data) return null;
    if (Array.isArray(data)) return data.join(", ");
    return data;
  };

  const ingredientsText = renderIngredients();

  return (
      <>
        <div
            onClick={handleCardClick}
            className="
          group relative flex flex-col justify-between
          w-full max-w-sm mx-auto
          bg-white rounded-2xl overflow-hidden
          shadow-md hover:shadow-xl
          transform transition-all duration-300 hover:-translate-y-1
          cursor-pointer border border-gray-100
        "
        >
          {rank && (
              <div className="absolute top-0 left-0 z-10">
                <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-br-lg shadow-sm">
                  #{rank} Best Seller
                </div>
              </div>
          )}
          <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
            />
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-center gap-2 mb-2">
              <h3 className="font-bold text-start text-xl text-gray-800 leading-tight line-clamp-2">
                {item.name}
              </h3>
              <span className="shrink-0 text-xl font-extrabold text-gray-900">
              {item.cost} €
            </span>
            </div>
            {ingredientsText && (
                <div className="mb-3">
                  <p className="text-base font-medium text-gray-200 italic line-clamp-2 leading-relaxed">
                    {ingredientsText}
                  </p>
                </div>
            )}
            <div className="mt-auto pt-2" onClick={handleAddToCartClick}>
              <div className="w-full transform transition-all duration-300">
                <AddToCartButton item={item} />
              </div>
            </div>
          </div>
        </div>

        <ProductModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            product={item}
        />
      </>
  );
};

export default ProductCard;