import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './../Provider/AuthProvider';
import { FiSend } from "react-icons/fi";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = location.state || 0;
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

      const handlePurchaseProduct = async () => {
        if (!product.name || !phone || !quantity) {
          alert("Please fill required fields.");
          return;
        }
        setLoading(true);
        const purchaseData = {
          productName: product.name,
          phone: phone,
          quantity: quantity,
          comment: comment,
          email: user?.email,
        };

        try {
          const response = await fetch("http://localhost:5000/purchase", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(purchaseData),
          });

          if (!response.ok) {
            throw new Error("Failed to purchase");
          }

          alert("parchase product successfully!");
          setComment("");
          setPhone("");
          setQuantity(0);
          setIsModalOpen(false);
          setLoading(false);
        } catch (error) {
          console.error("Error purchasing product:", error);
          setLoading(false);
          alert("Failed to purchase the message.");

        }
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

{isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex overflow-y-auto items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Purshase product</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product name *
              </label>
              <input
                type="text"
                value={product?.name}
                className="mt-2 p-2 border rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Quantity *
              </label>
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-2 p-2 border rounded-lg w-full"
                rows="2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {handlePurchaseProduct()}}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

        <div className="flex justify-center items-center my-10 mx-5">
          <div className="mx-5 w-52 h-52 border-2 border-blue-500">
            <img src={product.image} />
          </div>
          <div className="flex-col">
            <h1 className="text-xl font-bold">{product?.name}</h1>
            <p className="pt-2 text-lg">
              <span>
                <b>Price:</b>{" "}
              </span>{" "}
              TK {product?.price}
            </p>
            <p className="pt-2 text-lg">
              <span>
                <b>Ratings:</b>{" "}
              </span>{" "}
              {product?.rating}
            </p>
            <button
              onClick={() => {
                setIsModalOpen(true)
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