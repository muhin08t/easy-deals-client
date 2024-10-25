import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaCreditCard, FaWallet, FaPaypal } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { AuthContext } from './../../Provider/AuthProvider';

const UserProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
      const fetchProducts = async () => {
        try {
          console.log("user id user products "+user.uid);
          const urllll = `http://localhost:5000//purchase_products/${user.uid}`;
          console.log("url value in user products "+urllll);
          const response = await fetch(`http://localhost:5000/purchase_products/${user.uid}`);
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
            <th className="py-2 px-4 border">Product Name</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{item?.productName}</td>
              <td className="py-2 px-4 border">{item?.quantity}</td>
              <td className="py-2 px-4 border">{item?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default UserProducts;