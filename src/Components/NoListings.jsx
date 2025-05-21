import React from "react";
import animationData from "../Animation/empty-list-animation.json";
import Lottie from "lottie-react";

const NoListings = () => {
  return (
    <div className="flex justify-center items-center gap-6 flex-wrap px-4 py-1">
      {/* Animation */}
      <div className="w-48 sm:w-64 md:w-72">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center items-start gap-2 text-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold font-cabin">
          No Listings Found
        </h1>
        <p className="text-sm sm:text-base font-cabin">
          Create a new listing to get started
        </p>
      </div>
    </div>
  );
};

export default NoListings;
