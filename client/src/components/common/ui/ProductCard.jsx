import AddToCartButton from "/src/features/cart/components/AddToCartButton.jsx";
import ProductModal from "/src/components/common/ui/ProductModal.jsx";
import { useState, useEffect } from "react";

const ProductCard = ({ item = {}, bgColor = "white" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`bg-${bgColor}
      relative
      p-6 sm:p-8 md:p-5
      rounded-3xl shadow-md
      flex flex-col justify-between
      items-center
      text-center
      min-w-[260px]
      w-full
      max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[400px]
      lg:max-h-[500px]
      hover:scale-107
      active:scale-107
      cursor-pointer
      transition-all duration-300 ease-in-out
    `}
    onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="max-w-[120px] sm:w-[220px] md:w-[260px] lg:w-[300px] object-contain"
        />

        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full gap-2 mt-4">
          <p className="font-bold text-xl sm:text-xl lg:2text-xl">{item.name}</p>
          <p className="text-2xl sm:text-3xl font-semibold">{item.cost} €</p>
        </div>

        <AddToCartButton item={item}/>

      </div>
    <ProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={item} />
    </>
  );
};

export default ProductCard;