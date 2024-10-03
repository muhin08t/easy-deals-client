// NavBar.js

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div> 
 <div className="navbar bg-[#bbd5d6]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn text-white rounded-md btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li> <Link to="/">Home</Link></li>
        <li><Link to="/about">Products</Link></li>
      </ul>
    </div>
    <div className="avatar ml-10">
  <div className="w-10 rounded-full">
    <img src="/logo-e-learning.png" alt='logo site' />
  </div>
  <h1 className='text-[#5a55f5] text-xl ml-10 font-edu mt-1'>E-Learning</h1>
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        <li className='text-black text-lg'> <Link to="/">Home</Link></li>
        <li className='text-black text-lg'><Link to="/about">Products</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <p className='text-black text-xs font-poppins'>Muhin Khan</p>
    <button className='w-24 h-11 bg-[#f86a8d] text-white rounded-md ml-5 mr-12'>Login</button>
  </div>
</div>

</div>

    );
}

export default Navbar;
