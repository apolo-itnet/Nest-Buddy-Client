import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer";
import LoadingSpinner from "../Components/LoadingSpinner";
import "aos/dist/aos.css";

const MainLayout = () => {
  const { state } = useNavigation();

  // 🔴 Theme state and effect
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky bg-white dark:bg-neutral top-0 z-50 transition-colors duration-300">
        {/* Pass toggle function to Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main className="flex-grow">
        {state === "loading" ? <LoadingSpinner /> : <Outlet />}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
