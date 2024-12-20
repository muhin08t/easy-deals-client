import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from './../Provider/AuthProvider';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaPenAlt,
  FaList ,
  FaBox ,
} from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardSidebarContent = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://easy-deals-server.onrender.com/user/${user.uid}`);
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
      <div className="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          {/* <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label> */}
        </div>
        <div className="drawer-side h-auto">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="p-4">
            {/* User Profile Info */}
            <div className="flex flex-row lg:flex-col items-start gap-2">
              <img
                src={user?.photoURL}
                alt="User Profile"
                className="w-16 rounded-full"
              />
              <span>{user?.displayName}</span>
              <span className="text-xs">{user?.email}</span>
            </div>
            <hr className="my-4" />

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-4">
              {/* Profile Link */}
              <NavLink
                to="/dashboard/profile"
                state={{ uid: user.uid }}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }
              >
                <FaUser className="inline mr-2" />
                Profile
              </NavLink>

              {!userData?.isBlocked && (
                <>
                  {" "}
                  {/* Admin Links */}
                  {userData?.isAdmin && (
                    <>
                      <NavLink
                        to="/dashboard/allUsers"
                        className={({ isActive }) =>
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-blue-500"
                        }
                      >
                        <FaUsers className="inline mr-2" />
                        All Users
                      </NavLink>
                      <NavLink
                        to="/dashboard/allCategories"
                        className={({ isActive }) =>
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-blue-500"
                        }
                      >
                        <FaList className="inline mr-2" />
                        All Category
                      </NavLink>
                      <NavLink
                        to="/dashboard/allProducts"
                        className={({ isActive }) =>
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-blue-500"
                        }
                      >
                        <FaBox className="inline mr-2" />
                        All Products
                      </NavLink>

                      <NavLink
                        to="/dashboard/createMessage"
                        className={({ isActive }) =>
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-blue-500"
                        }
                      >
                        <FaPenAlt className="inline mr-2" />
                        Create Message
                      </NavLink>
                    </>
                  )}
                  {/* User Links */}
                  {!userData?.isAdmin && (
                    <NavLink
                      to="/dashboard/messages"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }
                    >
                      <FaEnvelope className="inline mr-2" />
                      Messages
                    </NavLink>
                  )}
                  {!userData?.isAdmin && (
                    <NavLink
                      to="/dashboard/userProducts"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }
                    >
                      <FaBox className="inline mr-2" />
                      Products
                    </NavLink>
                  )}
                  {
                    <NavLink
                      to="/dashboard/themeSwithcher"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-500"
                      }
                    >
                      <FontAwesomeIcon className="inline mr-2" icon={faToggleOn} />
                      Toggle Theme
                    </NavLink>
                  }
                </>
              )}
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-600 text-sm hover:underline flex items-center"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
