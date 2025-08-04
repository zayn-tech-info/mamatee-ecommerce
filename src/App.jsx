import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Checkout from "./pages/checkout/Checkout";
import Cart from "./pages/cart/Cart";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
