import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

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
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
          <div className="avatar ml-10 hidden md:block">
            <div className="w-10 rounded-full">
              <img src="/logo-e-learning.png" alt="logo site" />
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
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <p className="text-black text-xs font-poppins">{user?.displayName}</p>
          {user  &&  (
            <div className="avatar ml-5">
            <div className="w-10 rounded-full">
              <img src= {user?.photoURL} alt="" />
            </div>
          </div> ) 
          }
          {user ? (
            <button
              onClick={() => {
                logOut();
              }}
              className="w-24 h-11 bg-[#f86a8d] text-white rounded-md ml-5 mr-12"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
            <button className="w-24 h-11 bg-[#f86a8d] text-white rounded-md ml-5 mr-12" >
              Login
            </button>
            </Link>

          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
