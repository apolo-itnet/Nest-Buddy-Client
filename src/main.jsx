import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Aos from "aos";
import "aos/dist/aos.css";

Aos.init({
  duration: 1000,
  easing: "ease-in-out",
  once: false,
});



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
