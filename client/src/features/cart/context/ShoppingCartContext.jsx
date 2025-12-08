import { createContext, useEffect, useState, useMemo } from "react";

export const CartContext = createContext(null);

const readStoredCart = () => {
  try {
    const stored = localStorage.getItem("cartItems");
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed
      .filter((item) => item && typeof item.id !== "undefined")
      .map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 1,
      }));
  } catch (err) {
    console.warn("Failed to read cart from storage", err);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readStoredCart());

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (err) {
      console.warn("Failed to persist cart to storage", err);
    }
  }, [cartItems]);

  const addCartItem = (item) => {
    if (!item) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, ...item, quantity: (i.quantity ?? 0) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const deleteCartItem = (itemId) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === itemId);

      if (!existingItem) {
        return prev;
      }

      if (existingItem.quantity && existingItem.quantity > 1) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prev.filter((item) => item.id !== itemId);
      }
    });
  };

  const clearCart = () => setCartItems([]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 10) * item.quantity,
      0
    );
  }, [cartItems]);

  const totalTax = useMemo(() => {
    return totalPrice * 0.14;
  }, [totalPrice]);
  const withoutTax = useMemo(() => {
    return totalPrice - totalTax;
  }, [totalPrice, totalTax]);

  const value = {
    cartItems,
    addCartItem,
    deleteCartItem,
    clearCart,
    totalItems,
    totalPrice,
    totalTax,
    withoutTax,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
