import React from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import logoImg from "../../../public/images/coral-logo.png";
import { BsPersonFill } from "react-icons/bs";
import { BiSolidShoppingBag } from "react-icons/bi";

const Nav = () => {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between flex-wrap bg-white p-6 ">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <button className="flex items-center py-2 w-[181.55px]  text-primary  hover:text-gray-500 transition-colors duration-300 ease-in-out">
            <FiSearch className="text-xl" />
          </button>
          <div className="flex items-center flex-shrink-0 text-white mx-auto">
            <Image src={logoImg} alt="Logo" />
          </div>
          <div className="text-sm  text-right">
            <a
              href="#account"
              className="block mt-4 lg:inline-block lg:mt-0 text-primary hover:text-gray-500 mr-4 transition-colors duration-300 ease-in-out"
            >
              <span className="flex">
                {" "}
                <BsPersonFill className="text-xl mr-1" /> Account
              </span>
            </a>
            <a
              href="#shopping"
              className="block mt-4 lg:inline-block lg:mt-0 text-primary hover:text-gray-500 transition-colors duration-300 ease-in-out"
            >
              <span className="flex">
                <BiSolidShoppingBag className="text-xl mr-1" /> Shopping
              </span>
            </a>
          </div>
        </div>
      </nav>
      <hr className="border-t-2 border-gray-50" />
      <nav className="flex justify-center bg-white p-6">
        <div className="flex justify-between w-full  mx-auto">
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Jewelry & Accessories
          </a>
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Clothing & Shoes
          </a>
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Home & Living
          </a>
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Wedding & Party
          </a>
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Toys & Entertainment
          </a>
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Art & Collectibles
          </a>
          <a
            href="#shopping"
            className=" hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Craft Supplies & Tools
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
