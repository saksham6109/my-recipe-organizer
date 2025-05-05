import React from "react";

const Loader = ({ size = "w-10 h-10", color = "border-green-500" }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
