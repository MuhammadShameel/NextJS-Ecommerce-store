// SkeletonLoader.jsx

import React from "react";

const SkeletonLoader = () => (
  <div className="bg-[#f5f3ec]">
    <div className="relative container mx-auto p-6">
      <div className="container mx-auto flex flex-wrap">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4">
            <div className=" rounded-lg p-4">
              <div className="bg-gray-200 h-[270px] w-[270px] animate-pulse rounded-lg"></div>
              <div className="mt-4">
                <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
                <div className="ms-auto bg-gray-200 h-4 w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
