"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";

import logoImg from "../../../public/images/pepzilogo.png";
import CartModal from "@/app/components/CartModal";

const Nav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="container mx-auto font-roboto">
        <nav className="flex items-center justify-between flex-wrap p-6">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 text-black mr-6">
            <Image
              className="log-img object-contain h-10 w-24 mix-blend-darken"
              src={logoImg}
              alt="Logo"
            />
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex md:flex-grow md:items-center md:justify-center">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-semibold text-gray-900 hover:text-[#f2252a]"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-semibold text-gray-900 hover:text-[#f2252a]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-semibold text-gray-900 hover:text-[#f2252a]"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-semibold text-gray-900 hover:text-[#f2252a]"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 font-semibold text-gray-900 hover:text-[#f2252a]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-900 hover:text-[#f2252a]"
              onClick={openCart}
            >
              <CiShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="ml-1 text-sm font-semibold">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="text-gray-900 hover:text-[#f2252a]">
              <CiUser size={24} />
            </button>
          </div>
        </nav>
      </div>
      {isCartOpen && <CartModal onClose={closeCart} />}
    </div>
  );
};

export default Nav;
