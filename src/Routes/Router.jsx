import { createBrowserRouter } from "react-router";
import MainLayout from "../Main/MainLayout";
import Home from "../Pages/Home";
import NotFoundPage from "../Pages/NotFoundPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import LoadingSpinner from "../Components/LoadingSpinner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        hydrateFallbackElement: <LoadingSpinner/>
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ]},
]);

export default router;
