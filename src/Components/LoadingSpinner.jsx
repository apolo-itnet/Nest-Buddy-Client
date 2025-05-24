import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 w-full backdrop-blur-xs flex justify-center items-center z-50">
      <div className="h-[calc(100vh-240px)] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-lime-500"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
