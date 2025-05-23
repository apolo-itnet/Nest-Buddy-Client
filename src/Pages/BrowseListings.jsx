import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "../Context/AuthContext";

const BrowseListings = () => {
  const listingUsers = useLoaderData();
  const { user } = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = listingUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listingUsers.length / itemsPerPage);

  const [listingData, setListingData] = useState([]);
  const [mongoUsers, setMongoUsers] = useState([]);
  
   useEffect(() => {
    const fetchData = async () => {
      try {
        // লিস্টিং ফেচ
        const listingResponse = await fetch("http://localhost:5000/listingsRooms");
        if (!listingResponse.ok) throw new Error("Failed to fetch listings");
        const listings = await listingResponse.json();
        const userListings = listings.filter((listing) => listing.email === user?.email);
        setListingData(userListings);

        // সব ইউজার ফেচ
        const usersResponse = await fetch("http://localhost:5000/users");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const users = await usersResponse.json();
        setMongoUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load data!",
        });
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user]);

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getUserPhoto = (email) => {
    const user = mongoUsers.find((u) => u.email === email);
    return user?.photo || "https://i.postimg.cc/WpBxFRrR/user-5.png";
  };

  return (
    <div>
      {/* Table Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                  <div className="sm:col-span-1">
                    <label className="sr-only border border-gray-200 rounded-lg">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="hs-as-table-product-review-search"
                        className="py-2 px-3 ps-11 block w-full border border-gray-200 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <BsSearch />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 md:grow">
                    <div className="flex justify-end gap-x-2">
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                        <button
                          id="hs-as-table-table-export-dropdown"
                          type="button"
                          className="btn px-4 py-2 flex justify-center items-center gap-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-lime-500"
                        >
                          Add Post
                        </button>
                      </div>

                      <div
                        className="hs-dropdown [--placement:bottom-right] relative inline-block"
                        data-hs-dropdown-auto-close="inside"
                      >
                        <button
                          id="hs-as-table-table-filter-dropdown"
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          aria-haspopup="menu"
                          aria-expanded="false"
                          aria-label="Dropdown"
                        >
                          Filter
                          <span className="ps-2 text-xs font-semibold text-blue-600 border-s border-gray-200">
                            1
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Header */}

                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 font-manrope">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Image
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Posted User
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Details
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Location
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Room Type
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Posted Date
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase text-gray-800">
                            Availability
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {paginatedUsers.map((user, index) => (
                      <tr
                        key={index}
                        className="px-2 bg-white hover:bg-gray-50 font-cabin"
                      >
                        <td className="">
                          <a className="block p-2">
                            <div className="flex items-center gap-x-4">
                              <img
                                className="shrink-0 w-24 h-24 object-center object-cover rounded-lg"
                                src={user.photo}
                                alt="Product Image"
                              />
                            </div>
                          </a>
                        </td>

                         <td className="whitespace-nowrap">
                          <div className="block p-6" href="#">
                            <div className="flex flex-col  items-center gap-x-3">
                              { <img
                                className="posted-user-img inline-block size-12 rounded-full border border-gray-200 p-1"
                                src={getUserPhoto(user.email)}
                                alt="User Image"
                              /> }
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800">
                                  {user.first_name + " " + user.last_name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="">
                          <div className="block p-6" href="#">
                            <span className="block text-md font-medium text-gray-800">
                              {user.title}
                            </span>
                            <span className="block text-sm text-justify py-2 text-gray-500">
                              {user.lifestyle}
                            </span>
                          </div>
                        </td>

                        <td className="">
                          <div className="block p-6" href="#">
                            <span className="text-sm text-gray-600">
                              {user.location}
                            </span>
                          </div>
                        </td>

                        <td className="w-32">
                          <div className="block p-6" href="#">
                            <span className="text-sm text-gray-600">
                              {user.roomType}
                            </span>
                          </div>
                        </td>

                        <td className="w-36">
                          <div className="block p-6" href="#">
                            <span className="text-sm text-gray-600">
                              {user.localTime}
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap">
                          <div className="block p-6" href="#">
                            <span
                              className={`w-full text-center py-2 px-3 flex justify-center items-center gap-x-1 text-sm font-medium  rounded-xl ${
                                user.availability === "Immediate"
                                  ? "bg-yellow-200 text-yellow-900"
                                  : user.availability === "Available"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {user.availability}
                            </span>
                          </div>
                        </td>

                        <td className="pr-3">
                          <div>
                            <Link
                              to={`/details/${user._id}`}
                              className="text-white bg-lime-500 rounded-sm px-4 py-6 btn shadow-none border-none hover:bg-lime-600 transition-colors duration-300 ease-in-out"
                            >
                              <IoEyeSharp size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* End Table */}

                {/* Footer */}
                <div className="px-4 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                  <div className="max-w-sm py-2 px-2 flex justify-center items-center border border-gray-300 rounded-lg">
                    <span className="font-medium">Page No.</span>
                    <select
                      value={currentPage}
                      onChange={handlePageChange}
                      className="py-1 px-3 flex items-center border-gray-200 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 ${
                        currentPage === 1
                          ? "opacity-50 pointer-events-none"
                          : "cursor-pointer"
                      }`}
                    >
                      <IoIosArrowBack size={18} /> Prev
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 ${
                        currentPage === totalPages
                          ? "opacity-50 pointer-events-none"
                          : "cursor-pointer"
                      }`}
                    >
                      Next <IoIosArrowForward size={18} />
                    </button>
                  </div>
                </div>
                {/* End Footer */}
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Table Section */}
    </div>
  );
};

export default BrowseListings;
