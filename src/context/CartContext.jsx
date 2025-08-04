import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState(null);

  const loadCart = async () => {
    const response = await axios.get("https://dummyjson.com/carts/1");
    setCarts(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  
  return (
    <CartContext.Provider value={{ carts }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
