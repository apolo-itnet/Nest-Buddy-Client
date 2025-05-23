import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router"; 
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import ButtonSpinner from "../Components/ButtonSpinner";
import { BiHomeSmile } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { TbListSearch } from "react-icons/tb";
import { CgUserList } from "react-icons/cg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex z-50 w-full py-2 border-b border-gray-200">
      <nav className="relative max-w-7xl mx-auto w-full flex justify-between items-center px-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center rounded-xl text-xl font-semibold"
        >
          <img
            className="w-14 h-14"
            src="https://i.postimg.cc/GpdhCL0c/location.gif"
            alt="Nest Buddy logo"
          />
          <p className="font-poetsen text-xl font-bold hidden md:block hover:text-lime-500 transition-colors duration-300">
            Nest Buddy
          </p>
        </NavLink>

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-x-3 font-manrope text-sm font-medium">
          <NavLink to="/" className={({ isActive }) =>
            `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
          }>
            <BiHomeSmile size={18} /> Home
          </NavLink>
          <NavLink to="/add-listing" className={({ isActive }) =>
            `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
          }>
            <FaUserPlus size={18} /> Add Roommate
          </NavLink>
          <NavLink to="/browse-listing" className={({ isActive }) =>
            `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
          }>
            <TbListSearch size={18} /> Browse Listing
          </NavLink>
          <NavLink to="/my-listings" className={({ isActive }) =>
            `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${isActive ? "bg-lime-400" : "hover:bg-lime-500"}`
          }>
            <CgUserList size={18} /> My Listings
          </NavLink>
        </div>

        {/* User Profile & Auth Buttons */}
        <div className="flex items-center gap-x-3">
          {user ? (
            <div className="flex items-center gap-x-4 relative group">
              <img
                src={user.photoURL || "https://i.postimg.cc/Kvtwt9r1/man-3.png"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-[150px] text-center">
                <p>{user.displayName || "User"}</p>
                <p>{user.email || "No Email"}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="btn py-2 px-6 w-24 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-lime-500 text-black hover:bg-lime-400 transition-colors duration-300"
              >
                {isLoading ? <ButtonSpinner /> : "Logout"}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="py-2 px-5 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="py-2 px-5 text-sm font-medium rounded-xl bg-lime-400 text-black hover:bg-lime-500">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
