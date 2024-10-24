import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCreditCard, FaWallet, FaPaypal } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const UserProducts = () => {
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
        <div className="mx-auto text-center mt-10">
          <span className="loading loading-spinner loading-xs"></span>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="loading loading-spinner loading-md"></span>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl inline-block font-bold">Your Products</h1>
          <button
              className="bg-green-500 text-white px-4 ml-5 rounded h-10 disabled"
            >
              Total amount spent : 
            </button>
        </div>
        <table className="min-w-96 mx-auto bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{item?.name}</td>
              <td className="py-2 px-4 border">
                <img
                  src={item?.image || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => openEditModal()}
                  className="mr-2 p-2 rounded-full size-8 bg-yellow-500 text-white"
                  title="Payment"
                >
                  <FaCreditCard />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default UserProducts;