import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard"); // Uncomment to navigate to home on brand click
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex cursor-pointer" onClick={handleClick}>
        <span className="text-3xl text-gray-800 font-bold">SchemeCompass</span>
      </div>
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/schemefinder" // Update to a string path for Schemefinder
            className="text-gray-800 font-bold transition-colors duration-300 hover:text-green-500"
          >
            Scheme Finder
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/document" // Use NavLink for consistency
            className="text-gray-800 font-bold transition-colors duration-300 hover:text-green-500"
          >
            Document
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile" // Use NavLink for profile
            className="text-gray-800 font-bold transition-colors duration-300 hover:text-green-500"
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
