import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyListings = () => {
  const listingUsers = useLoaderData();
  const { user } = useContext(AuthContext);
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    setListingData(listingUsers);
  }, [listingUsers]);

  const email = user?.email;
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    fetch(`https://roommates-finder-server-six.vercel.app/users/email/${email}`)
      .then((res) => res.json())
      .then((data) => setMongoUser(data));
  }, [email]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const userListings = listingData.filter(
    (listing) => listing.email === user?.email
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = userListings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(userListings.length / itemsPerPage);

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

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://roommates-finder-server-six.vercel.app/listingsRooms/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
              const updatedListings = listingData.filter(
                (item) => item._id !== _id
              );
              setListingData(updatedListings);
            }
          });
      }
    });
  };

  return (
    <div>
      {/* Table Section */}
      <div className="w-full mx-auto responsive-padding py-10 lg:py-14 text-base-content bg-base-100">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className=" border border-base-300 rounded-xl shadow-2xs overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-base-300">
                  <div className="sm:col-span-1">
                    <label className="sr-only border border-base-300 rounded-lg">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="hs-as-table-product-review-search"
                        className="py-2 px-3 ps-11 block w-full border border-base-300 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
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
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-base-300   shadow-2xs hover:bg-base-200 focus:outline-hidden focus:bg-base-200 disabled:opacity-50 disabled:pointer-events-none"
                          aria-haspopup="menu"
                          aria-expanded="false"
                          aria-label="Dropdown"
                        >
                          Filter
                          <span className="ps-2 text-xs font-semibold text-blue-600 border-s border-base-300">
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
                  <thead className="">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Image
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Posted User
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Details
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Location
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Room Type
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Posted Date
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Availability
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end">
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm font-semibold uppercase ">
                            Action
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {paginatedUsers.map((listing, index) => (
                      <tr
                        key={index}
                        className="px-2  hover:bg-base-200 font-cabin"
                      >
                        <td className="">
                          <a className="block p-2">
                            <div className="flex items-center gap-x-4">
                              <img
                                className="shrink-0 w-24 h-24 object-center object-cover rounded-lg"
                                src={listing.photo}
                                alt="Product Image"
                              />
                            </div>
                          </a>
                        </td>

                        <td className="whitespace-nowrap">
                          <div className="block p-6" href="#">
                            <div className="flex flex-col items-center gap-x-3">
                              {
                                <img
                                  className="posted-user-img inline-block size-12 rounded-full border border-base-300 p-1"
                                  src={mongoUser?.photo}
                                  alt="User Image"
                                />
                              }
                              <div className="grow">
                                <span className="block text-sm font-semibold ">
                                  {listing.first_name + " " + listing.last_name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="">
                          <div className="block p-6" href="#">
                            <span className="block text-md font-medium ">
                              {listing.title}
                            </span>
                            <span className="block text-sm text-justify py-2 text-gray-500">
                              {listing.lifestyle}
                            </span>
                          </div>
                        </td>

                        <td className="">
                          <div className="block p-6" href="#">
                            <span className="text-sm ">
                              {listing.location}
                            </span>
                          </div>
                        </td>

                        <td className="w-32">
                          <div className="block p-6" href="#">
                            <span className="text-sm ">
                              {listing.roomType}
                            </span>
                          </div>
                        </td>

                        <td className="w-36">
                          <div className="block p-6" href="#">
                            <span className="text-sm ">
                              {listing.localTime}
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap">
                          <div className="block p-6" href="#">
                            <span
                              className={`w-full text-center py-2 px-3 flex justify-center items-center gap-x-1 text-sm font-medium  rounded-xl ${
                                listing.availability === "Immediate"
                                  ? "bg-yellow-200 text-yellow-900"
                                  : listing.availability === "Available"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {listing.availability}
                            </span>
                          </div>
                        </td>

                        <td className="p-4 text-end">
                          <div className="flex justify-end gap-x-2">
                            <Link
                              to={`/details/${listing._id}`}
                              className="text-white bg-lime-500 rounded-sm px-3 btn shadow-none border-none hover:bg-lime-600 transition-colors duration-300 ease-in-out"
                            >
                              <IoEyeSharp size={16} />
                            </Link>
                            <Link
                              to={`/update-listing/${listing._id}`}
                              className=" bg-blue-500 rounded-sm px-3 btn shadow-none border-none hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                            >
                              <FaEdit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(listing._id)}
                              className="text-white bg-red-500 rounded-sm px-3 btn shadow-none border-none hover:bg-red-600 transition-colors duration-300 ease-in-out"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* End Table */}

                {/* Footer */}
                <div className="px-4 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-base-300">
                  <div className="max-w-sm py-2 px-2 flex justify-center items-center border border-gray-300 rounded-lg">
                    <span className="font-medium">Page No.</span>
                    <select
                      value={currentPage}
                      onChange={handlePageChange}
                      className="py-1 px-3 flex items-center border-base-300 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500"
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
                      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-base-300   shadow-2xs hover:bg-base-200 focus:outline-hidden focus:bg-base-200 ${
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
                      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-base-300  shadow-2xs hover:bg-base-200 focus:outline-hidden focus:bg-base-200 ${
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

export default MyListings;
