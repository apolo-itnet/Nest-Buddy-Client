import { createBrowserRouter, Navigate } from "react-router";
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
import RoomDetails from "../Pages/RoomDetails";
import ListingRoomSection from "../Components/ListingRoomSection";
import Dashboard from "../Pages/Dashboard";
import Footer from "../Components/Footer";
import StatContent from "../Components/Dashboard/StatContent";
import AllPosts from "../Pages/AllPosts";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingSpinner/>,
    children: [
      {
        path: "/",
        loader: () => fetch("http://localhost:5000/listingsRooms"),
        element: <Home />,
        hydrateFallbackElement: <LoadingSpinner/>
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
        path: "/about",
        element: <AboutUs/>
      },
      {
        path: "/contact",
        element: <ContactUs/>
      },
      {
        path: "/listing-card-section",
        loader: () => fetch("http://localhost:5000/listingsRooms"),
        element: (
          <PrivateRoutes>
            <ListingRoomSection />
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingSpinner/>
      },
      {
        path: "/browse-listing",
        loader: () => fetch("http://localhost:5000/listingsRooms"),
        element: <AllPosts />,
        hydrateFallbackElement: <LoadingSpinner/>
      },

      {
        path: "/update-listing/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/listingsRooms/${params.id}`),
        element: (
          <PrivateRoutes>
            <UpdateListing />
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingSpinner/>
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/listingsRooms/${params.id}`),
        element: (
          <PrivateRoutes>
            <RoomDetails />
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingSpinner/>
      },
     
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    hydrateFallbackElement: <LoadingSpinner/>,

    children: [
      {
        index: true,
        element: <StatContent />,
      },
      {
        path: "browse-listing",
        loader: () => fetch("http://localhost:5000/listingsRooms"),
        element: <AllPosts />,
        hydrateFallbackElement: <LoadingSpinner/>
      },
      {
        path: "add-listing",
        element: (
          <PrivateRoutes>
            <AddListing />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-listings",
        loader: () => fetch("http://localhost:5000/listingsRooms"),
        element: (
          <PrivateRoutes>
            <MyListings />
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingSpinner/>,
      },
    ],
  },
]);

export default router;
