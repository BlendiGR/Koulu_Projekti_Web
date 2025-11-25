import { createContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "cartItems";

const readStoredCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed
      .filter((item) => item && typeof item.id !== "undefined")
      .map((item) => ({
        id: item.id,
        quantity: Number(item.quantity) || 1,
      }));
  } catch (err) {
    console.warn("Failed to read cart from storage", err);
    return [];
  }
};

const ShoppingCart = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readStoredCart());

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn("Failed to persist cart to storage", err);
    }
  }, [cartItems]);

  const addCartItem = (itemId) => {
    if (!itemId) return;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        );
      }

      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const deleteCartItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0
  );

  const value = {
    cartItems,
    addCartItem,
    deleteCartItem,
    clearCart,
    totalItems,
    readStoredCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, ShoppingCart };
