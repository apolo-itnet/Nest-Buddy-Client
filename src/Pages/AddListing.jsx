import React from "react";
import {
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaDollarSign,
  FaListAlt,
  FaSlidersH,
  FaPhone,
  FaCalendarAlt,
  FaImage,
  FaFileUpload,
} from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import NoListings from "../Components/NoListings";
import { SlEnergy } from "react-icons/sl";

const AddListing = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="pt-10">
        <h1 className="text-6xl font-normal font-poetsen tracking-tighter py-4 ">
          Active Listings
        </h1>

        {/* name of each tab group should be unique */}
        <div className="flex justify-start items-center space-x-2  ">
          <a
            rel="noopener noreferrer"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-400 text-lg font-medium"
          >
            <span className="flex justify-center items-center gap-2">
              {" "}
              <GoTasklist size={22} /> Active
            </span>
          </a>
          <a
            rel="noopener noreferrer"
            className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-400 text-lg font-medium"
          >
            <span className="flex justify-center items-center gap-2">
              {" "}
              <GoTasklist size={22} /> Inactive
            </span>
          </a>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            {/* <SlEnergy size={22}/> */}
            <p className="text-lg font-medium">Get up to 5 listings for free</p>
          </div>
          <button className="btn">View Plans</button>
        </div>

        <div>

        </div>

      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById("add_post").showModal()}
        >
          open modal
        </button>
        <dialog id="add_post" className="modal modal-middle bg-transparent">
          <div className="w-full mx-auto p-2 lg:p-0">
            <form className="max-w-6xl mx-auto bg-white backdrop-blur-xs p-8 rounded-2xl shadow-xl border border-gray-100/50 font-cabin font-medium tracking-wide">
              <h2 className="text-3xl font-poetsen font-medium text-center mb-8">
               Create Listing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Email - read only */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaEnvelope /> User Email
                  </label>
                  <input
                    type="email"
                    defaultValue="test@mail.com"
                    readOnly
                    className="w-full border border-gray-300 rounded-full px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* First Name & Last Name */}
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaUser /> First Name
                    </label>
                    <input
                      type="text"
                      value="Apolo"
                      readOnly
                      className="w-full border border-gray-300 rounded-full px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div className="w-1/2">
                    {/* Last Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        <FaUser /> Last Name
                      </label>
                      <input
                        type="text"
                        value="Dev"
                        readOnly
                        className="w-full border border-gray-300 rounded-full px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaListAlt /> Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                  />
                </div>

                {/* Location & Rent Amount */}
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaMapMarkerAlt /> Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                    />
                  </div>

                  {/* Rent Amount */}
                  <div className="w-1/2">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        <FaDollarSign /> Rent Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter rent amount"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Lifestyle Preferences */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaSlidersH /> Lifestyle Preferences
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Non-smoker, Vegetarian"
                    className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                  />
                </div>

                {/* Room Type & Availability (side by side) */}
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaListAlt /> Room Type
                    </label>
                    <select className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500">
                      <option>Select room type</option>
                      <option>Single</option>
                      <option>Shared</option>
                      <option>Studio</option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaCalendarAlt /> Availability
                    </label>
                    <select className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500">
                      <option>Select availability</option>
                      <option>Immediate</option>
                      <option>Next Month</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info & Photo URL (side by side) */}
                <div className="w-full flex flex-col gap-4 ">
                  <div className="flex gap-4 w-full">
                    {/* Contact Info */}
                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        <FaPhone /> Contact Info
                      </label>
                      <input
                        type="text"
                        placeholder="Enter phone or email"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                      />
                    </div>

                    {/* Photo URL */}
                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        <FaImage /> Photo URL
                      </label>
                      <input
                        type="text"
                        placeholder="Enter image URL"
                        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                      />
                    </div>
                  </div>

                  {/* Upload Photo */}
                  <div className="">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <FaFileUpload /> Upload Photo
                    </label>
                    <input
                      type="file"
                      disabled
                      className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500 bg-white"
                    />
                  </div>
                </div>

                {/* Description (full width) */}
                <div className="">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Enter detailed description"
                    className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="btn w-full bg-lime-600 hover:bg-lime-700 text-white py-6 rounded-full text-lg font-semibold transition duration-500 cursor-pointer"
                >
                  Add Roommate
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>

      <NoListings/>
    </div>
  );
};

export default AddListing;
