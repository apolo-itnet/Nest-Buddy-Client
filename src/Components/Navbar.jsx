import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { BiHomeSmile } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { TbListSearch } from "react-icons/tb";
import { CgUserList } from "react-icons/cg";
import { FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideDown } from "../Utility/Animation";
import PrimaryBtn from "../Shared/Button/PrimaryBtn";
import SecondaryBtn from "../Shared/Button/SecondaryBtn";
import { toastError, toastSuccess } from "../Utility/NotifyToast";
import { LayoutDashboard } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import axios from "axios";

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/email/${user.email.toLowerCase()}`)
        .then((res) => setMongoUser(res.data))
        .catch((err) => console.error("User fetch error:", err));
    }
  }, []);

  // Logout handler
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    setIsLoading(true);
    try {
      await logout();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toastSuccess("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toastError(`Logout failed! : ${error.message}, {
        position: "bottom-right",
        duration: 5000,
        icon: "❌",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
        ariaProps: { role: "status", "aria-live": "polite" },
        iconTheme: {
          primary: "#EF4444",
          secondary: "#FFFAEE",
        },}`);
    } finally {
      setIsLoading(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/", icon: <BiHomeSmile /> },
    { label: "Browse Posts", href: "/browse-listing", icon: <CgUserList /> },
    { label: "About Us", href: "/about", icon: <TbListSearch /> },
    { label: "Contact", href: "/contact", icon: <FaUserPlus /> },
  ];

  const privateLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <LuLayoutDashboard /> },
  ];

  return (
    <header id="navbar">
      <div className="w-full flex justify-between items-center py-2 bg-base-100 border-b border-gray-100  responsive-padding font-manrope">
        <motion.div
          variants={slideDown(0.2)}
          initial="initial"
          animate="animate"
          className="navbar flex justify-between items-center w-full"
        >
          {/* Mobile Menu */}
          <div className="md:navbar-start  ">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              {/* Logo */}

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-xs h-72"
              >
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src={"https://i.postimg.cc/vZWHk1Nq/home-search.png"}
                    alt="Lost Trace Logo"
                    className="w-8 flex justify-center items-center lg:hidden pb-4  "
                  />
                  <span className="block md:hidden text-2xl font-bold font-poetsen hover:text-lime-400 transition-colors duration-300 ease-in-out">
                    Nest Buddy
                  </span>
                </Link>
                <ul className="text-sm font-medium flex flex-col items-start gap-3">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2 py-2 rounded-md transition-all ease-in-out duration-300 
                      ${isActive ? "bg-lime-400" : "hover:bg-lime-500"} `
                        }
                      >
                        {link.icon} {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={"https://i.postimg.cc/vZWHk1Nq/home-search.png"}
                alt="Lost Trace Logo"
                className="w-10 lg:flex hidden "
              />{" "}
              <span className="hidden md:block text-2xl font-bold font-poetsen hover:text-lime-400 transition-colors duration-300 ease-in-out">
                Nest Buddy
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex justify-center items-center">
            <ul className="text-sm font-medium flex items-center gap-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2 py-2 rounded-md transition-all ease-in-out duration-300 
                      ${isActive ? "bg-lime-400" : "hover:bg-lime-500"} `
                    }
                  >
                    {link.icon} {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown avatar menu*/}
          <div className="navbar-end gap-2 z-50">
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                  data-tip={user.displayName || "User"}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img
                        src={
                          user?.photoURL ||
                          "https://i.postimg.cc/C5kPH183/user-2.png"
                        }
                        alt="User"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10" />
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 h-30 space-y-1 text-lg font-medium "
                >
                  {privateLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className="flex items-center gap-2 py-3 text-sm font-medium  hover:text-lime-500 hover:translate-x-2 transition-all ease-in-out duration-300"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.icon} <span className="">{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm py-3"
                    >
                      <FaSignOutAlt /> Signout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <SecondaryBtn label={"Login"}></SecondaryBtn>
                </Link>
                <Link to="/register">
                  <PrimaryBtn label={"Register"}></PrimaryBtn>
                </Link>
              </div>
            )}

            <div className="pl-2">
              <button onClick={toggleTheme} className="btn btn-circle  text-xl">
                {theme === "light" ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
