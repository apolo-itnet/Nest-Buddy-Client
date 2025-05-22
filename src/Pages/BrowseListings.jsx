import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { IoEyeSharp } from "react-icons/io5";

const BrowseListings = () => {
  const listingUsers = useLoaderData();
  const [users, setUsers] = useState(listingUsers);

  return (
    <div>
      {/* Table Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Card */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                  {/* Input */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="hs-as-table-product-review-search"
                      className="sr-only"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="hs-as-table-product-review-search"
                        className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <svg
                          className="shrink-0 size-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* End Input */}

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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Image
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Posted User
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Details
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Location
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Room Type
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Posted Date
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase text-gray-800">
                            Availability
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  {users.map((user, index) => (
                    <tbody key={index} className="divide-y divide-gray-200">
                      <tr className="px-2 bg-white hover:bg-gray-50 font-cabin">
                        <td className="">
                          <a className="block p-2">
                            <div className="flex items-center gap-x-4">
                              <img
                                className="shrink-0 w-14 h-14 object-center object-cover rounded-lg"
                                src={user.photo}
                                alt="Product Image"
                              />
                            </div>
                          </a>
                        </td>

                        <td className="whitespace-nowrap">
                          <a className="block p-6" href="#">
                            <div className="flex items-center gap-x-3">
                              <img
                                className="inline-block size-9.5 rounded-full"
                                src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                alt="Product Image"
                              />
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800">
                                  {user.first_name + " " + user.last_name}
                                </span>
                              </div>
                            </div>
                          </a>
                        </td>

                        <td className="">
                          <a className="block p-6" href="#">
                            <span className="block text-md font-medium text-gray-800">
                              {user.title}
                            </span>
                            <span className="block text-sm text-justify py-2 text-gray-500">
                              {user.lifestyle}
                            </span>
                          </a>
                        </td>

                        <td className="">
                          <a className="block p-6" href="#">
                            <span className="text-sm text-gray-600">
                              {user.location}
                            </span>
                          </a>
                        </td>

                        <td className="">
                          <a className="block p-6" href="#">
                            <span className="text-sm text-gray-600">
                              {user.roomType}
                            </span>
                          </a>
                        </td>

                        <td className="">
                          <a className="block p-6" href="#">
                            <span className="text-sm text-gray-600">
                              {user.localTime}
                            </span>
                          </a>
                        </td>

                        <td className="whitespace-nowrap">
                          <a className="block p-6" href="#">
                            <span className="py-2 px-3 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                              {user.availability}
                            </span>
                          </a>
                        </td>

                        <td className="pr-3">
                          <div>
                            <Link
                              to={`/details/${user._id}`}
                              className="text-white bg-lime-500 rounded-sm px-4 btn shadow-none border-none hover:bg-lime-600 transition-colors duration-300 ease-in-out"
                            >
                              <IoEyeSharp size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
                {/* End Table */}

                {/* Footer */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                  <div className="max-w-sm space-y-3">
                    <select className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option selected>5</option>
                      <option>6</option>
                    </select>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Next
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
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
