// SkeletonLoader.jsx

import React from "react";
import { MdFilterAlt } from "react-icons/md";

const SkeletonLoader = () => (
  <div className="relative container mx-auto p-6">
    <h2 className="text-center mb-2">Experience the Art of Food</h2>
    <nav className="flex items-center justify-between bg-white py-7">
      <div className="flex">
        <ul className="flex">
          {[...Array(9)].map((_, index) => (
            <li key={index} className="mr-5">
              <div className="bg-gray-200 h-4 w-20 mb-1"></div>
            </li>
          ))}
        </ul>
      </div>
      <button className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800">
        <MdFilterAlt className="text-xl mr-1" />
        Filter
      </button>
    </nav>
    <div className="container mx-auto flex flex-wrap">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-full md:w-1/2 lg:w-1/4">
          <div className="bg-white rounded-lg p-4">
            <div className="bg-gray-200 h-44 w-full rounded-lg"></div>
            <div className="mt-4">
              <div className="bg-gray-200 h-4 w-3/4 mb-2"></div>
              <div className="ms-auto bg-gray-200 h-4 w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
