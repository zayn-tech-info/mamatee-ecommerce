import React, { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const NavBar = () => {
  const { carts } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navMenu = [
    { id: "1", name: "Products", href: "/" },
    { id: "2", name: "Categories", href: "/categories" },
    { id: "3", name: "Contact", href: "/contact" },
    { id: "4", name: "About Us", href: "/about" },
  ];

  const handleNavClick = (href) => {
    console.log(`Navigating to: ${href}`);
    setIsMobileMenuOpen(false);
  };

  const totalCartItem = carts.products
    ? carts.products.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">
                Mama Tee
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navMenu.map((nav) => (
                <Link key={nav.id} to={nav.href}>
                  {" "}
                  <button
                    onClick={() => handleNavClick(nav.href)}
                    className="text-gray-600 hover:text-green-600 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {nav.name}
                  </button>
                </Link>
              ))}
              <Link to="/cart">
                <button
                  onClick={() => handleNavClick("/cart")}
                  className="text-gray-600 hover:text-green-600 hover:bg-green-50 p-2 rounded-md transition-colors duration-200 relative"
                >
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItem}
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navMenu.map((nav) => (
                <Link key={nav.id} to={nav.href}>
                  <button
                    onClick={() => handleNavClick(nav.href)}
                    className="text-gray-600 hover:text-green-600 hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                  >
                    {nav.name}
                  </button>
                </Link>
              ))}
              <Link to="/cart">
                <button
                  onClick={() => handleNavClick("/cart")}
                  className="text-gray-600 hover:text-green-600 hover:bg-green-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left flex items-center"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Cart ({totalCartItem})
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
