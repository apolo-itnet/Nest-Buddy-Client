import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import ButtonSpinner from "../Components/ButtonSpinner";
import { BiHomeSmile } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { TbListSearch } from "react-icons/tb";
import { CgUserList } from "react-icons/cg";
import { HiOutlineX } from "react-icons/hi";
import { RiMenu2Fill } from "react-icons/ri";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({theme, toggleTheme}) => {
  const { user, logout } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!user?.email) {
      setMongoUser(null);
      return;
    }

    const fetchMongoUser = async () => {
      try {
        const encodedEmail = encodeURIComponent(user.email);
        const res = await fetch(
          `https://roommates-finder-server-six.vercel.app/users/email/${encodedEmail}`
        );
        if (!res.ok) throw new Error("Failed to fetch MongoDB user");
        const data = await res.json();
        setMongoUser(data);
      } catch (error) {
        console.error("MongoDB user fetch error:", error);
        setMongoUser(null);
      }
    };

    fetchMongoUser();
  }, [user]);

  // Logout handler
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
      console.error("Logout error:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex w-full z-50 py-2 border-b border-base-300 text-base-content bg-base-100">
      <nav className="relative w-full mx-auto flex justify-between items-center responsive-padding">
        {/* Logo */}
        <NavLink
          to="/"
          className="hidden lg:flex items-center rounded-xl text-xl font-semibold  "
        >
          <img
            className="w-14 h-14 "
            src="https://i.postimg.cc/GpdhCL0c/location.gif"
            alt="Nest Buddy logo"
          />
          <p className="font-poetsen text-xl font-bold hidden md:block hover:text-lime-500 transition-colors duration-300 text-base-content bg-base-100">
            Nest Buddy
          </p>
        </NavLink>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center gap-x-3 font-manrope text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${
                isActive ? "bg-lime-400" : "hover:bg-lime-500"
              }`
            }
          >
            <BiHomeSmile size={18} /> Home
          </NavLink>
          <NavLink
            to="/add-listing"
            className={({ isActive }) =>
              `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${
                isActive ? "bg-lime-400" : "hover:bg-lime-500"
              }`
            }
          >
            <FaUserPlus size={18} /> Add Roommate
          </NavLink>
          <NavLink
            to="/browse-listing"
            className={({ isActive }) =>
              `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${
                isActive ? "bg-lime-400" : "hover:bg-lime-500"
              }`
            }
          >
            <TbListSearch size={18} /> Browse Listing
          </NavLink>
          <NavLink
            to="/my-listings"
            className={({ isActive }) =>
              `px-2 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${
                isActive ? "bg-lime-400" : "hover:bg-lime-500"
              }`
            }
          >
            <CgUserList size={18} /> My Listings
          </NavLink>
        </div>

        {/* dropdown menu  */}
        <div className="lg:hidden w-full py-3 flex items-center relative z-50">
          <button onClick={toggleMenu} className="text-3xl">
            {isOpen ? <HiOutlineX /> : <RiMenu2Fill />}
          </button>

          {/* Slide-down Menu (using transition instead of AOS) */}
          <div
            className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-b-xl mt-3 px-4 overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
            }`}
          >
            <nav className="flex flex-col gap-3">
              <div>
                <NavLink
                  to="/"
                  className="flex items-center gap-2 rounded-xl text-xl font-semibold"
                >
                  <img
                    className="w-12 h-12"
                    src="https://i.postimg.cc/GpdhCL0c/location.gif"
                    alt="Nest Buddy logo"
                  />
                  <p className="font-poetsen text-xl font-bold hover:text-lime-500 transition-colors duration-300">
                    Nest Buddy
                  </p>
                </NavLink>
              </div>
              {/* Menu Items */}
              {[
                ["/", "Home", <BiHomeSmile size={18} />],
                ["/add-listing", "Add Roommate", <FaUserPlus size={18} />],
                [
                  "/browse-listing",
                  "Browse Listing",
                  <TbListSearch size={18} />,
                ],
                ["/my-listings", "My Listings", <CgUserList size={18} />],
              ].map(([path, label, icon]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `px-4 py-2 flex items-center gap-2 rounded-md transition-all duration-300 ${
                      isActive ? "bg-lime-400" : "hover:bg-lime-500"
                    }`
                  }
                >
                  {icon} {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* User Profile & Auth Buttons */}
        <div className="flex justify-between items-center gap-x-3 gap-y-2 max-w-full">
          {mongoUser ? (
            <div className="flex  items-center gap-x-4 relative group max-w-full">
              <img
                src={mongoUser.photo}
                alt="user"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-[150px] text-center break-words">
                <p>
                  {mongoUser.firstName} {mongoUser.lastName}
                </p>
                <p className="break-all">{mongoUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="btn py-2 px-6 w-24 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-xl border border-lime-500  hover:bg-lime-400 transition-colors duration-300 "
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
          <button onClick={toggleTheme} className="btn btn-circle btn-ghost text-xl">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
