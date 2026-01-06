import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] px-4 sm:px-6 md:px-8 lg:px-[40px] py-3 sm:py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* logo */}
        {/* logo */}
        <div className="w-[120px] sm:w-[140px] md:w-[160px] h-[60px] sm:h-[70px] md:h-[90px] flex items-center justify-center flex-shrink-0">
          <NavLink to="/">
            <img
              src="/Image/Logo (1).png"
              alt="Logo"
              className="w-full h-2/3 object-contain cursor-pointer"
            />
          </NavLink>
        </div>

        {/* menu - hidden on mobile */}
        <ul className="hidden lg:flex items-center justify-between gap-2 px-6 h-16 bg-black border-2 sm:border-3 border-[#3a3a3a] rounded-xl text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs sm:text-sm px-3 py-2 rounded-md transition ${
                  isActive ? "bg-red-600 text-white" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `text-xs sm:text-sm px-3 py-2 rounded-md transition ${
                  isActive ? "bg-red-600 text-white" : ""
                }`
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                `text-xs sm:text-sm px-3 py-2 rounded-md transition ${
                  isActive ? "bg-red-600 text-white" : ""
                }`
              }
            >
              Support
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                `text-xs sm:text-sm px-3 py-2 rounded-md transition ${
                  isActive ? "bg-red-600 text-white" : ""
                }`
              }
            >
              Subscription
            </NavLink>
          </li>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-md text-xs sm:text-sm font-medium transition hover:bg-red-700 hover:shadow-lg cursor-pointer">
            Logout
          </button>
        </ul>
        <div className="flex items-center gap-3 sm:gap-5 text-white">
          <NavLink to="/search">
            <FaSearch className="text-lg sm:text-2xl cursor-pointer hover:text-gray-400 transition" />
          </NavLink>
          <FaBell className="text-lg sm:text-2xl cursor-pointer hover:text-gray-400 transition" />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-xl sm:text-2xl"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-black border border-[#3a3a3a] rounded-lg p-4 text-white">
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm transition ${
                    isActive ? "bg-red-600" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm transition ${
                    isActive ? "bg-red-600" : ""
                  }`
                }
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/support"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm transition ${
                    isActive ? "bg-red-600" : ""
                  }`
                }
              >
                Support
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subscription"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md text-sm transition ${
                    isActive ? "bg-red-600" : ""
                  }`
                }
              >
                Subscription
              </NavLink>
            </li>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md text-sm transition hover:bg-red-700">
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
