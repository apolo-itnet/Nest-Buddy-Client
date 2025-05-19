import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 w-full bg-sky-800/30 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="h-[calc(100vh-240px)] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-default-600"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
