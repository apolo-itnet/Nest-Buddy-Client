import React, { useEffect, useState } from "react";
import { GoTasklist } from "react-icons/go";
import NoListings from "../Components/NoListings";
import { CgPlayListRemove } from "react-icons/cg";
import Aos from "aos";
import ListingForm from "../Components/ListingForm";

const AddListing = () => {
  const [activeTab, setActiveTab] = useState("active");

   useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="w-full mx-auto responsive-padding text-base-content bg-base-100 ">

      {/* active inactive tabs */}
      <div className=" pt-4">
        <h1 className="text-6xl font-normal font-poetsen tracking-tighter py-4 ">
          {activeTab === "active" ? "Active Listings" : "Inactive Listings"}
        </h1>

        <div className="flex justify-start items-center space-x-2 ">
          <a
            rel="noopener noreferrer"
            className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-400 text-lg font-medium cursor-pointer ${
              activeTab === "active" ? "border-b-2 border-lime-500" : ""
            }`}
            onClick={() => setActiveTab("active")}
          >
            <span className="flex justify-center items-center gap-2">
              <GoTasklist size={22} /> Active
            </span>
          </a>
          <a
            rel="noopener noreferrer"
            className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-gray-400 text-lg font-medium cursor-pointer ${
              activeTab === "inactive" ? "border-b-2 border-lime-500" : ""
            }`}
            onClick={() => setActiveTab("inactive")}
          >
            <span className="flex justify-center items-center gap-2">
              <CgPlayListRemove size={22} /> Inactive
            </span>
          </a>
        </div>
      </div>


      {/* add listing form */}
      <div>
        <ListingForm/>
      </div>

      <NoListings />
    </div>
  );
};

export default AddListing;
