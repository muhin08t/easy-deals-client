import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const { id } = location.state || 0 ;
    console.log(id);

          useEffect(() => {
            const fetchProduct = async () => {
              try {
                const response = await fetch(`http://localhost:5000/products/${id}`);
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
              } catch (error) {
                console.error("Error fetching products:", error);
                // Handle error state (optional)
                setProduct({});
              } finally {
                setLoading(false); // Ensure loading is set to false even in case of error
              }
            };
          
            fetchProduct();
          }, []);
          
    return (
      <div>
        {isLoading && (
          <div className="mx-auto text-center mt-10">
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        <div className="flex justify-center items-center my-10 mx-5">
          <div className="mx-5 w-52 h-52 border-2 border-blue-500">
            <img src={product.image} />
          </div>
          <div className="flex-col">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p className="pt-2 text-lg">
              <span>
                <b>Price:</b>{" "}
              </span>{" "}
              TK {product.price}
            </p>
            <p className="pt-2 text-lg">
              <span>
                <b>Ratings:</b>{" "}
              </span>{" "}
              {product.rating}
            </p>
            <button
              onClick={() => {
                handleClick(item.product_id);
              }}
              className="bg-green-500 hover:bg-green-700 text-white py-2 mt-5 px-4 rounded h-10"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductDetails;