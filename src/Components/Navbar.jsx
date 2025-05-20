import React from "react";
import { Link, NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="flex z-50 w-full py-1">
        <nav className="relative max-w-7xl mx-auto w-full flex justify-between items-center px-4  ">
          <div className="flex items-center">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex justify-center items-center rounded-xl text-xl font-semibold focus:outline-hidden focus:opacity-80"
            >
              <img
                className="w-14 h-14"
                src={"https://i.postimg.cc/GpdhCL0c/location.gif"}
                alt="logo"
              />
              <p className="font-poetsen text-2xl font-bold hidden md:block">
                Nest Buddy
              </p>
            </NavLink>
            {/* End Logo */}
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex justify-between items-center gap-x-4 font-cabin font-medium tracking-wide">
            <NavLink
              className={({ isActive }) =>
                `inline-block px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `inline-block px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
              }
              to={"/add-listing"}
            >
              Add to Find Roommate
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `inline-block px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
              }
              to={"/browse-listing"}
            >
              Browse Listing
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `inline-block px-4 py-2 rounded-md transition-all duration-300 ease-in-out
                ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
              }
              to={"/my-listings"}
            >
              My Listings
            </NavLink>
          </div>

          {/* Button Group */}
          <div className="flex items-center gap-x-3">
            <Link to="/login">
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="py-2 px-5 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="py-2 px-5 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 focus:outline-hidden focus:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none"
              >
                Register
              </button>
            </Link>

            <div className="lg:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                id="hs-navbar-hcail-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-hcail"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-hcail"
              ></button>
            </div>
          </div>
          {/* End Button Group */}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
