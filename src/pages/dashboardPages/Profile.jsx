import { useContext, useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi"; // Importing react-icon
import { AuthContext } from './../../Provider/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const { uid } = location.state || 0 ;
  console.log("user id "+uid);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoUrl: "",
    address: "",
  });

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`https://easy-deals-server.onrender.com/user/${uid}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching products:", error);
            // Handle error state (optional)
            setUserData({});
            setLoading(false);
          } finally {
            setLoading(false); // Ensure loading is set to false even in case of error
          }
        };
      
        fetchUserData();
      }, []);

  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        ...userData,
        displayName: formData.displayName,
        phone: formData.phone,
        photoUrl: formData.photoUrl,
        address: formData.address,
      };

      // Make API call to update user information
      const response = await fetch(
        `http://localhost:5000/user/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      // Close the modal upon successful update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("There was an error updating the user. Please try again.");
    }
  };

  // Open the edit modal with the user's current details
  const handleOpenEditModal = () => {
    setFormData({
      displayName: userData.displayName || "",
      phone: userData.phone || "",
      photoUrl: userData.photoUrl || "",
      address: userData.address || "",
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative">
      {isLoading && (
        <div className="mx-auto text-center mt-10">
          <span className="loading loading-spinner loading-xs"></span>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="loading loading-spinner loading-md"></span>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <div className="flex flex-col items-center">
        <img
          src={userData?.photoUrl}
          alt="Profile"
          className="w-36 h-36 object-cover rounded-full shadow-md"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {userData?.displayName}
        </h2>
        <p className="text-gray-500">{userData?.email}</p>
        <div>
          <strong
            className={!user?.isBlocked ? "text-green-500" : "text-red-500"}
          >
            {!userData?.isBlocked ? "Active" : "Blocked"}
          </strong>
        </div>
      </div>

      <div className="mt-6 w-full">
        <h3 className="text-xl font-bold text-gray-700">Profile Details</h3>
        <hr />
        <ul className="mt-3 text-gray-600 space-y-2">
          <li>
            <strong>Role:</strong> {userData?.isAdmin ? "Admin" : "User"}
          </li>
          <li>
            <strong>Email:</strong> {userData?.email}
          </li>
          <li>
            <strong>Phone:</strong> {userData?.phone || "N/A"}
          </li>
          <li>
            <strong>Address:</strong> {userData?.address || "N/A"}
          </li>
          <hr />
          <li>
            <strong>Unique ID:</strong> {userData?.uid}
          </li>
        </ul>
      </div>

      {/* Edit Button with React Icon */}
      {!user?.isBlocked ? (
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition-transform transform hover:scale-105"
          onClick={handleOpenEditModal}
        >
          <FiEdit size={24} />
        </button>
      ) : null}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Edit User</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.photoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, photoUrl: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Address:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
            <button
              onClick={() => {handleUpdate()}}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
