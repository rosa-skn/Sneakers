import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-200 px-12 rounded-lg mr-5 ml-5 mt-5">
      <div className="flex items-center justify-between">
        <ul className="flex space-x-6">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'font-bold' : 'text-black'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/product" 
              className={({ isActive }) => isActive ? 'font-bold' : 'text-black'}
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/Wishlist" 
              className={({ isActive }) => isActive ? 'font-bold' : 'text-black'}
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? 'font-bold' : 'text-black'}
            >
              Login
            </NavLink>
          </li>
        </ul>
        <img src="/images/logo2.png" alt="Logo" className="w-30 h-20 mr-40" />
        <div className="flex items-center">
        </div>
      </div>
    </nav>
  );
};
export default Navbar;