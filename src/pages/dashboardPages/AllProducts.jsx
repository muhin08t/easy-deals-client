import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash  } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      image: "",
      rating: "",
    });

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

    useEffect(() => {
      fetchProducts();
    }, []);

    const openEditModal = (product) => {
      setSelectedProduct(product);
      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
        rating: product.rating || "",
      });
      setIsEditModalOpen(true);
    };
    
    const handleClickedDeleteProduct = (product) => {
      setSelectedProduct(product);
      setIsDeleteModalOpen(true);
    };

      // Delete a product
  const handleDelete = async () => {
    try {
      console.log({ selectedProduct });

      await fetch(
        `https://easy-deals-server.onrender.com/product/${selectedProduct._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
         
        }
      );
      fetchProducts(); // Reload products after update
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

      // Update product info
  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        ...selectedProduct,
        name: formData.name,
        price: formData.price,
        image: formData.image,
        rating: formData.rating,
      };

      await fetch(
        `https://easy-deals-server.onrender.com/product/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      fetchProducts(); // Reload users after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
    const handleClick = () => {
      navigate(`/dashboard/addProducts`);
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
          <h1 className="text-2xl inline-block font-bold">All Products</h1>
          <button
              onClick={() => {
                handleClick()
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
                  onClick={() => openEditModal(item)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Edit Proudct"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleClickedDeleteProduct(item)}
                  className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                  title="Delete product"
                >
                  <FaTrash  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

            {/* Edit Modal */}
            {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit Product</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Price:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Rating:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
     {/* Delete Modal */}
     {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">
              Do you want to delete this product ?
            </h3>
            <button
              onClick={handleDelete}
              className={`bg-red-500 text-white px-4 py-2 rounded`}
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
    );
};

export default AllProducts;