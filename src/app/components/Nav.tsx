import React from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import logoImg from "../../../public/images/coral-logo.png";
import { BsPersonFill } from "react-icons/bs";
import { BiSolidShoppingBag } from "react-icons/bi";

const Nav = () => {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center justify-between flex-wrap bg-white p-6 border-b-2 border-gray-50">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <button className="flex items-center px-3 py-2   text-primary  hover:text-gray-500 ">
            <FiSearch className="text-xl" />
          </button>
          <div className="flex items-center flex-shrink-0 text-white mx-auto">
            <Image src={logoImg} alt="Logo" />
          </div>
          <div className="text-sm  text-right">
            <a
              href="#account"
              className="block mt-4 lg:inline-block lg:mt-0 text-primary hover:text-gray-500 mr-4"
            >
              <span className="flex">
                {" "}
                <BsPersonFill className="text-xl mr-1" /> Account
              </span>
            </a>
            <a
              href="#shopping"
              className="block mt-4 lg:inline-block lg:mt-0 text-primary hover:text-gray-500"
            >
              <span className="flex">
                <BiSolidShoppingBag className="text-xl mr-1" /> Shopping
              </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
