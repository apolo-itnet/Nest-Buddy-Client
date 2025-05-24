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
import RoomDetails from "../Pages/RoomDetails";
import ListingRoomSection from "../Components/ListingRoomSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        path: "/",
        loader: () => fetch("https://roommates-finder-server-six.vercel.app/listingsRooms"),
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
        path: "/listing-card-section",
        loader: () => fetch("https://roommates-finder-server-six.vercel.app/listingsRooms"),
        element: (
          <privateRoutes>
            <ListingRoomSection />
          </privateRoutes>
        ),
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoutes>
            <AddListing />
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "/browse-listing",
        loader: () => fetch("https://roommates-finder-server-six.vercel.app/listingsRooms"),
        element: <BrowseListings />,
        hydrateFallbackElement: <LoadingSpinner />,
      },
      {
        path: "/my-listings",
        loader: () => fetch("https://roommates-finder-server-six.vercel.app/listingsRooms"),
        element: (
          <PrivateRoutes>
            <MyListings></MyListings>
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-listing/:id",
        loader: ({ params }) =>
          fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/${params.id}`),
        element: (
          <PrivateRoutes>
            <UpdateListing />
          </PrivateRoutes>
        ),
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/${params.id}`),
        element: (
          <PrivateRoutes>
            <RoomDetails />
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingSpinner />,
      },
    ],
  },
]);

export default router;
