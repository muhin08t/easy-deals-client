import React from 'react';
import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryBasedProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const { cat_id } = location.state || 0 ;
    console.log(cat_id);

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`http://localhost:5000/category/products/${cat_id}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            console.error("Error fetching products:", error);
            // Handle error state (optional)
            setProducts([]);
          } finally {
            setLoading(false); // Ensure loading is set to false even in case of error
          }
        };
      
        fetchProducts();
      }, []);

      const handleClick = (id) => {
        console.log("handle click called "+id);
        navigate(`/products/${id}`, { state: { id: id } });
      };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 m-10">
        {products.map((item, index) => {
          return (
            <div key={index}>
              <div className="card w-80 h-80 bg-base-100 shadow-xl transition-transform duration-300 hover:scale-110">
                <div className="card-body flex flex-col items-center">
                  <h2 className="card-title text-center whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</h2>
                  <img
                    className="w-44 h-32"
                    src={item.image}
                    alt="Products"
                  />
          <div className="flex justify-between">
          <p className="pt-2 text-lg"><span><b>Price:</b> </span> TK {item.price}</p>
          <p className="pt-2 text-lg ml-4"><span><b>Ratings:</b> </span> {item.rating}</p>
            </div>
                  <button
                    onClick={() => {
                      handleClick(item.product_id);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 mt-2 px-4 rounded h-10"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    );
};

export default CategoryBasedProducts;