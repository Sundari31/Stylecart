import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      let updated;

      if (existing) {
        updated = prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        updated = [...prev, { ...product, qty: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      console.log("Cart updated:", updated);
      return updated;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
