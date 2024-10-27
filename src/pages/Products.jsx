import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`https://easy-deals-server.onrender.com/products`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProducts(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          // Handle error state (optional)
          setProducts([]);
          setLoading(false);
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
            <div className="w-1/3 p-4 bg-white rounded shadow">
              <p className="text-center mb-4">Loading...</p>
              <div className="flex justify-center">
                <div className="w-16 h-16 border-8 border-dashed border-blue-500 rounded-full animate-spin"></div>
              </div>
            </div>
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
                    src={item?.image}
                    alt="Products"
                  />
          <div className="flex justify-between">
          <p className="pt-2 text-lg"><span><b>Price:</b> </span> TK {item.price}</p>
          <p className="pt-2 text-lg ml-4"><span><b>Ratings:</b> </span> {item.rating}</p>
            </div>
                  <button
                    onClick={() => {
                      handleClick(item._id);
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

export default Products;