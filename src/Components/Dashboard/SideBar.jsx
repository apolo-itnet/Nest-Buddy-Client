import React from "react";
import { NavLink } from "react-router";
import { CgUserList } from "react-icons/cg";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import PrimaryBtn from "../../Shared/Button/PrimaryBtn";

const SideBar = () => {
  const privateLinks = [
    { label: "Home", href: "/dashboard", icon: <TiHomeOutline /> },
    {
      label: "All Posts",
      href: "/dashboard/browse-listing",
      icon: <CiBoxList />,
    },
    {
      label: "Add Listing",
      href: "/dashboard/add-listing",
      icon: <MdOutlinePlaylistAdd />,
    },
    {
      label: "My Listings",
      href: "/dashboard/my-listings",
      icon: <CgUserList />,
    },
    {
      label: "Profile Setting",
      href: "/dashboard/profile-setting",
      icon: <IoSettingsOutline />,
    },
  ];

  return (
    <div className="flex flex-col justify-between items-start w-full h-full py-10 relative">
      <div>
        <NavLink to="/" className="flex justify-center items-center gap-2">
          <img
            src={"https://i.postimg.cc/vZWHk1Nq/home-search.png"}
            alt="Lost Trace Logo"
            className="w-10 flex justify-center items-center"
          />
          <span className="text-2xl font-bold font-poetsen hover:text-lime-400 transition-colors duration-300 ease-in-out">
            Nest Buddy
          </span>
        </NavLink>
      </div>

      <div className=" flex flex-col items-start top-40 pl-2">
        <div className="space-y-3">
          {privateLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
                  isActive ? "text-lime" : "text-gray-700"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <NavLink to="/">
          <PrimaryBtn
            type="button"
            label={"Exit"}
            className="w-full"
            img={<FaSignOutAlt />}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
