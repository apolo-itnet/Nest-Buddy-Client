import { Link, NavLink } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BiHomeSmile } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { TbListSearch } from "react-icons/tb";
import { CgUserList } from "react-icons/cg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navLinks = [
    { label: "Home", href: "/", icon: <BiHomeSmile /> },
    { label: "Browse Posts", href: "/browse-listing", icon: <CgUserList /> },
    { label: "About Us", href: "/about", icon: <TbListSearch /> },
    { label: "Contact", href: "/contact", icon: <FaUserPlus /> },
  ];

  return (
    <footer className="font-league border border-base-300">
      <div className="w-full mx-auto responsive-padding flex justify-between items-start gap-8 pt-12 pb-6">
        {/* Logo + Description */}
        <div className="flex-1">
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
          <p className=" text-sm">
            Connecting people to the perfect roommates with ease and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 ">
          {/* Quick Links */}
          <div className="">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-3 text-md">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.href}
                    className="flex items-center gap-2 hover:text-lime-500 hover:translate-x-2 transition-all ease-in-out duration-300"
                  >
                    {link.icon} {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold  mb-3">Resources</h3>
            <ul className="space-y-2 text-md">
              <li>
                <NavLink to="/about" className="hover:text-lime-500">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="hover:text-lime-500">
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className="hover:text-lime-500">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/terms" className="hover:text-lime-500">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>

        </div>

        {/* Social Media */}
        <div className="flex flex-col justify-between items-center lg:items-end ">
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-lime-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-lime-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-lime-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-lime-300">
              <FaLinkedinIn />
            </a>
          </div>
          {/* Bottom Text */}
          <div className="text-center lg:text-right py-4 pb-4 text-sm">
            © {new Date().getFullYear()} NestBuddy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
