import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
  
    // Load JSON Data
    useEffect(() => {
      fetch("https://e-learning-server-nu.vercel.app/products")
        .then((res) => res.json())
        .then((data) => {
           setProducts(data)
           setLoading(false)
        });
    }, []);
  
    const handleClick = (index) => {
      console.log("handle click called");
      navigate('/bookdetails', { state: { book: products[index] } });
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
                <div className="card mt-10 bg-base-100 w-96 shadow-xl md:w-80 lg:w-[350px] xl:w-96">
                  <figure>
                    <img
                      className="w-[150px] h-[150px]"
                      src={item.img_url}
                      alt="Books"
                    />
                  </figure>
                  <div className="card-body items-center text-center px-1">
                    <h2 className="card-title"> {item.title} </h2>
                    <h3 className="font-semibold"> {item.duration}</h3>
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