import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-lightgray">
      <ul className="flex items-center" class="pt-4 pb-6">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'font-bold underline' : 'text-black'}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/product" 
            className={({ isActive }) => isActive ? 'font-bold underline' : 'text-black'}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => isActive ? 'font-bold underline' : 'text-black'}
          >
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? 'font-bold underline' : 'text-black'}
          >
            Login
          </NavLink>
        </li>
        <div className="flex items-center justify-center pt-6 mb-4">
          <img src="/images/logo2.png" alt="Logo" className="w-24 h-20" />
        </div>
      </ul>
    </nav>
  );
};
export default Navbar;
