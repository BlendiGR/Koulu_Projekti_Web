import { useContext } from "react";
import { CartContext } from "/src/features/cart/context/ShoppingCartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
