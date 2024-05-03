"use client";
import React, { useState } from "react";

import jeansProduct from "../../../public/images/joggers.png";
import glasses from "../../../public/images/glasses.png";
import bag from "../../../public/images/bag.png";
import scarf from "../../../public/images/print-scarf.png";
import hoodie from "../../../public/images/yellow-hoodie.png";
import greenDress from "../../../public/images/green-dress.png";
import sneakers from "../../../public/images/nike-sneakers.png";
import jacket from "../../../public/images/jacket.png";
import Image from "next/image";

import { MdFilterAlt } from "react-icons/md";

const Products = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="container mx-auto font-open-sans">
      <div className="product-section p-6">
        <h2 className="text-center">Or subscribe to the newsletter</h2>
        <div>
          <nav className="flex items-center justify-between bg-white py-7">
            <div className="flex">
              {/* Medium Screen Dropdown */}
              <div className="relative lg:hidden">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-between bg-transparent text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {isDropdownOpen ? (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 6H16V8H4V6ZM4 11H16V13H4V11ZM4 16H16V18H4V16Z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 6H17V8H3V6ZM3 11H17V13H3V11ZM3 16H17V18H3V16Z"
                      />
                    )}
                  </svg>
                </button>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <ul className="absolute z-10 top-full rounded-lg mt-4 left-0 w-[140px] bg-white text-gray-500 shadow-lg py-1">
                    <li>
                      <a
                        href="#tshirt"
                        className="block px-4 py-2 text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        All Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="#bag"
                        className="block px-4 py-2 text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        T-Shirt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#item1"
                        className="block px-4 py-2 text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Hoodies
                      </a>
                    </li>
                    <li>
                      <a
                        href="#item2"
                        className="block px-4 py-2 text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                      >
                        Jacket
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              {/* Large Screen Menu */}
              <ul className="hidden lg:flex">
                <li className="mr-5">
                  <a
                    href="#tshirt"
                    className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                  >
                    All Products
                  </a>
                </li>
                <li className="mr-5">
                  <a
                    href="#bag"
                    className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                  >
                    T-Shirt
                  </a>
                </li>
                <li className="mr-5">
                  <a
                    href="#item1"
                    className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                  >
                    Hoodies
                  </a>
                </li>
                <li className="mr-5">
                  <a
                    href="#item2"
                    className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
                  >
                    Jacket
                  </a>
                </li>
              </ul>
            </div>
            <button className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800">
              <MdFilterAlt className="text-xl mr-1" />
              Filter
            </button>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={jeansProduct}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">
                    Adicolor Classics Joggers
                  </h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Dress
                  </h5>
                  <h5 className="text-sm tracking-tight ">$63.85</h5>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image className="object-cover" src={bag} alt="product image" />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">
                    Nike Sportswear Futura Luxe
                  </h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">Bag</h5>
                  <h5 className="text-sm tracking-tight ">$130.00</h5>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={scarf}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">
                    Geometric print Scarf
                  </h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Scarf
                  </h5>
                  <h5 className="text-sm tracking-tight ">$53.00</h5>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={hoodie}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">
                    Yellow Reserved Hoodie
                  </h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Dress
                  </h5>
                  <h5 className="text-sm tracking-tight ">$155.00</h5>
                </div>
              </div>
            </div>

            {/* <div className="cards flex"> */}
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={greenDress}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">Basic Dress Green</h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Dress
                  </h5>
                  <h5 className="text-sm tracking-tight ">$236.00</h5>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={sneakers}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">
                    Nike Air Zoom Pegasus
                  </h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Shoes
                  </h5>
                  <h5 className="text-sm tracking-tight ">$198.00</h5>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={jacket}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">Nike Repel Miler</h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Dress
                  </h5>
                  <h5 className="text-sm tracking-tight ">$120.50</h5>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <a className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover"
                  src={glasses}
                  alt="product image"
                />
              </a>
              <div className="mt-4 px-3 pb-5">
                <a href="#">
                  <h5 className="text-sm tracking-tight ">
                    Nike Sportswear Futura Luxe
                  </h5>
                </a>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Glasses
                  </h5>
                  <h5 className="text-sm tracking-tight ">$160.00</h5>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Products;
