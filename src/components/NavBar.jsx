import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { IoMdLogIn } from "react-icons/io";
import { FaTachometerAlt } from 'react-icons/fa';
import {
  FaUser,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaPenAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { signIn, googleSignIn, githubSignIn, user, logOut } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div>
      <div className="navbar bg-[#f8f9fa] py-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn text-white rounded-md btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 bg-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">All Products</Link>
              </li>
            </ul>
          </div>
          <div className="avatar ml-10 hidden md:block">
            <div className="w-10 rounded-full">
              <img src="/logo3.png" alt="logo site" />
            </div>
          </div>
          <h1 className="text-[#000] text-xl ml-10 font-edu mt-1 hidden sm:block">
            Easy deals
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-black text-lg">
              {" "}
              <Link to="/">Home</Link>
            </li>
            <li className="text-black text-lg">
              <Link to="/products">All Products</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/* <p className="text-black text-xs font-poppins">{user?.displayName}</p>
          {user  &&  (
            <div className="avatar ml-5">
            <div className="w-10 rounded-full">
              <img src= {user?.photoURL} alt="" />
            </div>
          </div> ) 
          } */}
          {user ? (
             <Link to="/dashboard"
             state={{ uid: user.uid }}
             className="font-semibold text-lg flex items-center justify-end gap-1 ml-5 mr-12"
             >
                 <FaTachometerAlt />
                 Dashboard
    
             </Link>
          ) : (
            <Link to="/login"
            className="font-semibold text-[#f86a8d] text-lg flex items-center justify-end gap-1 ml-5 mr-12"
            >
              Login <IoMdLogIn />
   
            </Link>

          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
