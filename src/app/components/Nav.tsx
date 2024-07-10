"use client";

import React from "react";
import Image from "next/image";

import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";

import logoImg from "../../../public/images/food-logo.png";

const Nav = () => {
  return (
    <div className="bg-[#f5f3ec]">
      <div className="container mx-auto font-roboto ">
        <nav className="flex items-center justify-between flex-wrap  p-6 ">
          <div className="w-full flex-grow flex lg:items-center lg:w-auto">
            <div className=" items-center mx-auto flex-shrink-0 text-white ">
              <Image
                className="log-img object-contain aspect-[8/2] mix-blend-darken"
                src={logoImg}
                alt="Logo"
              />
            </div>
            <div className="flex space-x-2 text-2xl font-semibold">
              <CiSearch className="text-black cursor-pointer hover:text-[#aa071c] transition ease-in-out duration-300" />
              <CiUser className="text-black cursor-pointer hover:text-[#aa071c] transition ease-in-out duration-300" />
              <CiShoppingCart className="text-black cursor-pointer hover:text-[#aa071c] transition ease-in-out duration-300" />
            </div>
          </div>
        </nav>
        <hr className="border-t-2 border-gray-700 w-100" />
      </div>
    </div>
  );
};

export default Nav;
