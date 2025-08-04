import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    setProducts(response.data.products);
    console.log(response.data.products);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-4 lg:px-8">
        <div className="grid md:grid-cols-4 md:gap-10 gap-5 grid-cols-3 ">
          {products.map((product) => {
            return (
              <div key={product.id}
                className="bg-gray-100 shadow-xl rounded-md border-1 border-gray-300"
              >
                <div className="h-70">
                  <div className="md:w-40 w-1/1 h-50">
                    <img
                      className="w-full h-40 object-cover object-center px-5"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </div>
                  <div className="bg-gray-300 px-5 py-3">
                    <div className="py-1 text-sm font-medium">
                      {product.title}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-medium">
                        ${product.price}
                      </span>
                      <span className="text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="text-white bg-black py-2 w-full cursor-pointer">
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
