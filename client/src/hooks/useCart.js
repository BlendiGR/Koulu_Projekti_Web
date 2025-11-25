import { CartContext } from "../contexts/ShoppingCartContext";
import { useContext } from "react";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a ShoppingCart provider");
  }

  return context;
};

export { useCart };
