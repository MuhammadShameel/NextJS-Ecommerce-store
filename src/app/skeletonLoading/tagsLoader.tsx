// CardLoader.jsx

import React from "react";
import { MdFilterAlt } from "react-icons/md";

const CardLoader = () => (
  <div className="bg-[#f5f3ec]">
    <div className="relative container mx-auto p-6">
      {/* <h2 className="text-center mb-2">Experience the Art of Food</h2> */}
      <nav className="flex items-center justify-between  py-7">
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
    </div>
  </div>
);

export default CardLoader;
