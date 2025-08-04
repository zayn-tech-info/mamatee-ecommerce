import React, { useState, useContext, useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { formatMoney } from "../../utils/formatMoney";
import { Link } from "react-router-dom";

const Cart = () => {
  const { carts } = useContext(CartContext);
  const [cartItems, setCartItems] = useState(carts?.products);

  useEffect(() => {
    if (carts?.products) {
      setCartItems(carts.products);
    }
  }, [carts]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + formatMoney(item.price) * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={cartItem.thumbnail}
                    alt={cartItem.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {cartItem.title}
                    </h3>
                    <p className="text-green-600 font-semibold">
                      ${formatMoney(cartItem.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.id, cartItem.quantity - 1)
                      }
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.id, cartItem.quantity + 1)
                      }
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="ml-4 text-right">
                    <p className="font-semibold text-gray-900">
                      $
                      {(
                        formatMoney(cartItem.price) * cartItem.quantity
                      ).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeItem(cartItem.id)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors duration-200 mt-4">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
