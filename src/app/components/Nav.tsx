"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import logoImg from "../../../public/images/coral-logo.png";
import { BsPersonFill } from "react-icons/bs";
import { BiSolidShoppingBag } from "react-icons/bi";
import { useState } from "react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div className="fixed font-roboto inset-y-0 left-0 max-w-xs w-full bg-white z-50 shadow transform transition-transform ease-in-out duration-300">
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <a href="#" className="block py-2">
            Jewelry & Accessories
          </a>
          <a href="#" className="block py-2">
            Clothing & Shoes
          </a>
          <a href="#" className="block py-2">
            Home & Living
          </a>
          <a href="#" className="block py-2">
            Wedding & Party
          </a>
          <a href="#" className="block py-2">
            Toys & Entertainment
          </a>
          <a href="#" className="block py-2">
            Art & Collectibles
          </a>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="container mx-auto font-roboto">
      <nav className="flex items-center justify-between flex-wrap bg-white p-6 ">
        <div className="w-full flex-grow flex lg:items-center lg:w-auto">
          <button className="hidden lg:flex items-center py-2 lg:w-[181.55px] text-primary hover:text-gray-500 transition-colors duration-300 ease-in-out">
            <FiSearch className="text-xl" />
          </button>

          <div className="flex items-center flex-shrink-0 text-white lg:mx-auto">
            <Image src={logoImg} alt="Logo" />
          </div>

          {/* for medium screen  */}

          <div className="ml-auto lg:hidden">
            <button
              id="dropdownMenuIconButton"
              className="inline-flex items-center p-2 text-sm font-medium text-center rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
              type="button"
              onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
          </div>

          {/* for medium screen  */}

          <div className="text-sm text-right lg:flex hidden ">
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
        <div
          id="dropdownDots"
          className={`${
            isTopMenuOpen ? "block" : "hidden"
          }  z-10 bg-white lg:hidden divide-y divide-gray-100 rounded-lg ml-auto mt-4 shadow w-44`}
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <a
                href="#account"
                className="block mt-4 lg:inline-block ml-5 lg:mt-0 text-primary hover:text-gray-500 mr-4 transition-colors duration-300 ease-in-out"
              >
                <span className="flex">
                  <BsPersonFill className="text-xl mr-1" /> Account
                </span>
              </a>
            </li>
            <li>
              <a
                href="#shopping"
                className="block mt-4 lg:inline-block ml-5 mb-3 lg:mt-0 text-primary hover:text-gray-500 transition-colors duration-300 ease-in-out"
              >
                <span className="flex">
                  <BiSolidShoppingBag className="text-xl mr-1" /> Shopping
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <hr className="border-t-2 border-gray-50" />
      <nav className="flex justify-center bg-white p-6">
        <div className="flex justify-between w-full  mx-auto">
          <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Jewelry & Accessories
          </a>
          <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Clothing & Shoes
          </a>
          <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Home & Living
          </a>
          <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Wedding & Party
          </a>
          <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Toys & Entertainment
          </a>
          <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Art & Collectibles
          </a>
          {/* <a
            href="#shopping"
            className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out"
          >
            Craft Supplies & Tools
          </a> */}
          <button
            className="lg:hidden"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </nav>
    </div>
  );
};

export default Nav;
