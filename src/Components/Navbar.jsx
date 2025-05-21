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

  // Define default image URL as a constant
  const defaultUserIcon = "https://i.postimg.cc/WpBxFRrR/user-5.png";

  // Function to get profile image
  const getProfileImage = () => {
    if (!user) return defaultUserIcon;
    return (
      user.photoURL || user?.providerData?.[0]?.photoURL || defaultUserIcon
    );
  };

  // handleLogout remains unchanged as per request
  const handleLogout = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await logout();
        setIsLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message || "Logout failed!");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div>
      <header className="flex z-50 w-full py-2 border-b border-gray-200">
        <nav className="relative max-w-7xl mx-auto w-full flex justify-between items-center px-4">

          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex justify-center items-center rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80"
            >
              <img
                className="w-14 h-14"
                src="https://i.postimg.cc/GpdhCL0c/location.gif"
                alt="Nest Buddy logo"
              />
              <p className="font-poetsen text-xl font-bold hidden md:block hover:text-lime-500 transition-colors duration-300 ">
                Nest Buddy
              </p>
            </NavLink>
          </div>

          <div className="hidden lg:flex justify-between items-center gap-x-2 font-cabin text-sm font-semibold tracking-wide">
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 flex justify-center items-center gap-2 rounded-md transition-all duration-300 ease-in-out ${
                  isActive ? "bg-lime-400" : "hover:bg-lime-500"
                }`
              }
              to="/"
            > <BiHomeSmile size={18} />
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 flex justify-center items-center gap-2 rounded-md transition-all duration-300 ease-in-out ${
                  isActive ? "bg-lime-400" : "hover:bg-lime-500"
                }`
              }
              to="/add-listing"
            > <FaUserPlus size={18}/>
              Add Roommate
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 flex justify-center items-center gap-2 rounded-md transition-all duration-300 ease-in-out ${
                  isActive ? "bg-lime-400" : "hover:bg-lime-500"
                }`
              }
              to="/browse-listing"
            >
              <TbListSearch size={18} />
              Browse Listing
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 flex justify-center items-center gap-2 rounded-md transition-all duration-300 ease-in-out ${
                  isActive ? "bg-lime-400" : "hover:bg-lime-500"
                }`
              }
              to="/my-listings"
            >
              <CgUserList size={18} />
              My Listings
            </NavLink>
          </div>

          <div className="flex items-center gap-x-3">
            {user ? (
              <div className="flex items-center gap-x-2 relative group">
                <img
                  src={getProfileImage()}
                  alt={user.displayName || "User profile"}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-[150px] text-center"
                  aria-live="polite"
                >
                  {user.displayName || "User"}
                  <br />
                  {user.email || "No Email"}
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  type="button"
                  className="py-2 px-5 w-24 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-lime-500 text-black hover:bg-lime-400 transition-colors duration-300 cursor-pointer focus:outline-none focus:bg-gray-100"
                >
                  {isLoading ? <ButtonSpinner /> : "Logout"}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="py-2 px-5 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="py-2 px-5 inline-flex items-center gap-x-2 text-sm font-medium text-nowrap rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 focus:outline-none focus:bg-lime-500 cursor-pointer"
                  >
                    Register
                  </button>
                </Link>
              </>
            )}

            <div className="lg:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                id="hs-navbar-hcail-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-hcail"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-hcail"
              ></button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
