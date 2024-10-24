import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaPlus  } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const prodUrl = "https://easy-deals-server.onrender.com/categories";
            const response = await fetch("https://easy-deals-server.onrender.com/categories");
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching products:", error);
            // Handle error state (optional)
            setCategories([]);
            setLoading(false);
          } finally {
            setLoading(false); // Ensure loading is set to false even in case of error
          }
        };
      
        fetchCategories();
      }, []);
    
  
      const handleClick = (cat_id) => {
        console.log("handle click called "+cat_id);
        navigate(`/category/products/${cat_id}`, { state: { cat_id: cat_id } });
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
          <h1 className="text-2xl inline-block font-bold">All Category</h1>
          <button
              onClick={() => {
                setIsModalOpen(true)
              }}
              className="bg-green-500 hover:bg-green-700 text-white px-4 ml-5 rounded h-10"
            >
              Add new
            </button>
        </div>
        <table className="min-w-96 mx-auto bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Logo</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{item?.name}</td>
              <td className="py-2 px-4 border">
                <img
                  src={item?.logo || "https://via.placeholder.com/50"}
                  alt="user"
                  className="w-10 rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
};

export default AllCategories;