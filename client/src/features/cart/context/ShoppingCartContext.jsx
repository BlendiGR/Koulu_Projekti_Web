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

const readStoredCoupon = () => {
  try {
    const stored = localStorage.getItem("appliedCoupon");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (err) {
    console.warn("Failed to read coupon from storage", err);
    return null;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readStoredCart());
  const [appliedCoupon, setAppliedCoupon] = useState(() => readStoredCoupon());

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (err) {
      console.warn("Failed to persist cart to storage", err);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("appliedCoupon");
      }
    } catch (err) {
      console.warn("Failed to persist coupon to storage", err);
    }
  }, [appliedCoupon]);

  const addCartItem = (item, quantity = 1) => {
    if (!item) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, ...item, quantity: (i.quantity ?? 0) + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity: quantity }];
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
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prev.filter((item) => item.id !== itemId);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  }, [cartItems]);

  
  const totalPrice = useMemo(() => {
    const basePrice = cartItems.reduce(
      (sum, item) => sum + (Number(item.cost)) * item.quantity,
      0
    );
    
    // Calculate discount as percentage of base price
    if (appliedCoupon && appliedCoupon.isActive) {
      const discountPercent = Number(appliedCoupon.discount) || 0;
      const discountAmount = (basePrice * discountPercent) / 100;
      return Math.max(0, basePrice - discountAmount);
    }

    
    return basePrice;
  }, [cartItems, appliedCoupon]);

  // Discount percentage value (for display)
  const discount = useMemo(() => {
    if (!appliedCoupon || !appliedCoupon.isActive) return 0;
    return Number(appliedCoupon.discount) || 0;
  }, [appliedCoupon]);

  const totalTax = useMemo(() => {
    return totalPrice * 0.14;
  }, [totalPrice]);

  const value = {
    cartItems,
    addCartItem,
    deleteCartItem,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totalItems,
    totalPrice,
    discount,
    totalTax,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};