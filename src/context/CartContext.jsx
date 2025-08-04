import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState({ products: [] });

  const loadCart = async () => {
    const response = await axios.get("https://dummyjson.com/carts/1");
    setCarts(response.data);
    console.log(response.data);
  };

  const removeFromCart = (productId) => {
    setCarts(prev => ({
      ...prev,
      products: prev.products.filter(item => item.id !== productId)
    }));
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ carts, removeFromCart }}>
      <NavBar />
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
