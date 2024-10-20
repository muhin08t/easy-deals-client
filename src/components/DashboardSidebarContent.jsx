import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from './../Provider/AuthProvider';
import { useContext } from "react";
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaPenAlt,
} from "react-icons/fa";

const DashboardSidebarContent = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div>
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
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
          }
        >
          <FaUser className="inline mr-2" />
          Profile
        </NavLink>

        {!user?.isBlocked && (
          <>
            {" "}
            {/* Admin Links */}
            {user?.isAdmin && (
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
            {!user?.isAdmin && (
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
