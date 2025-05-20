import { createBrowserRouter } from "react-router";
import MainLayout from "../Main/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import LoadingSpinner from "../Components/LoadingSpinner";
import NotFound from "../Pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import AddListing from "../Pages/AddListing";
import BrowseListings from "../Pages/BrowseListings";
import MyListings from "../Pages/MyListings";
import UpdateListing from "../Pages/UpdateListing";
import Details from "../Pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home />,
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoutes>
            <AddListing />
          </PrivateRoutes>
        ),
      },
      {
        path: '/browse-listing',
        element: <BrowseListings/>
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoutes>
            <MyListings></MyListings>
          </PrivateRoutes>
        )
      },
      {
        path: "/update-listing/:id",
        element: (
          <PrivateRoutes>
            <UpdateListing/>
          </PrivateRoutes>
        )
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoutes>
           <Details/>
          </PrivateRoutes>
        )
      }
    ],
  },
]);

export default router;
