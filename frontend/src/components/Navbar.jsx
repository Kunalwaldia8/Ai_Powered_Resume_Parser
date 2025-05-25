import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { ThemeContext } from "./ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`py-4 px-6 md:px-20 flex justify-between items-center sticky top-0 z-50 shadow-md transition-colors duration-300 animate-fade-in-down ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="flex items-center space-x-2">
        <NavLink
          to="/"
          onClick={scrollToTop}
          className={`text-sm font-medium transition ${
            theme === "light"
              ? "text-gray-600 hover:text-indigo-600"
              : "text-gray-300 hover:text-indigo-400"
          } hover:underline`}
        >
          <img src={logo} width={100} alt="Logo" className="cursor-pointer" />
        </NavLink>
      </div>
      <div className="flex space-x-6">
        <NavLink
          to="/"
          onClick={scrollToTop}
          className={`text-sm flex flex-col items-center font-medium transition transform hover:scale-105 ${
            theme === "light"
              ? "text-gray-600 hover:text-indigo-600"
              : "text-gray-300 hover:text-indigo-400"
          } `}
        >
          Home
          <hr
            className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-colors duration-300 ${
              theme === "light" ? "bg-gray-700" : "bg-gray-100"
            } `}
          />
        </NavLink>
        <NavLink
          to="/features"
          onClick={scrollToTop}
          className={`text-sm flex flex-col items-center font-medium transition transform hover:scale-105 ${
            theme === "light"
              ? "text-gray-600 hover:text-indigo-600"
              : "text-gray-300 hover:text-indigo-400"
          } `}
        >
          Features
          <hr
            className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-colors duration-300 ${
              theme === "light" ? "bg-gray-700" : "bg-gray-100"
            } `}
          />
        </NavLink>
        <NavLink
          to="/process"
          onClick={scrollToTop}
          className={`text-sm flex flex-col items-center font-medium transition transform hover:scale-105 ${
            theme === "light"
              ? "text-gray-600 hover:text-indigo-600"
              : "text-gray-300 hover:text-indigo-400"
          } `}
        >
          Process
          <hr
            className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-colors duration-300 ${
              theme === "light" ? "bg-gray-700" : "bg-gray-100"
            } `}
          />
        </NavLink>
        <NavLink
          to="/about"
          onClick={scrollToTop}
          className={`text-sm flex flex-col items-center font-medium transition transform hover:scale-105 ${
            theme === "light"
              ? "text-gray-600 hover:text-indigo-600"
              : "text-gray-300 hover:text-indigo-400"
          } `}
        >
          About
          <hr
            className={`w-2/4 border-none h-[1.5px] bg-gray-700 hidden transition-colors duration-300 ${
              theme === "light" ? "bg-gray-700" : "bg-gray-100"
            } `}
          />
        </NavLink>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTheme}
          className="text-sm font-medium transition transform hover:scale-110"
        >
          {theme === "light" ? (
            <svg
              className="w-6 h-6 text-indigo-600 hover:text-indigo-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-indigo-400 hover:text-indigo-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
