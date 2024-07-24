"use client";

import React, { useState } from "react";
// import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/app/context/CartContext";

import logoImg from "../../../public/images/official-logo.jpg";
import CartModal from "@/app/components/CartModal";

const Nav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-[#f5f3ec]">
      <div className="container mx-auto font-roboto">
        <nav className="flex items-center justify-between flex-wrap p-6">
          <div className="w-full flex-grow flex lg:items-center lg:w-auto">
            <div className="flex space-x-2 text-2xl font-semibold w-[88px] h-[24px]"></div>
            <div className="items-center mx-auto flex-shrink-0 text-white">
              <Image
                className="log-img object-contain aspect-[8/2] mix-blend-darken"
                src={logoImg}
                alt="Logo"
              />
            </div>
            <div className="flex space-x-2 text-2xl font-semibold relative">
              <CiSearch className="text-black cursor-pointer hover:text-[#aa071c] transition ease-in-out duration-300" />
              <CiUser className="text-black cursor-pointer hover:text-[#aa071c] transition ease-in-out duration-300" />
              <div className="relative">
                <CiShoppingCart
                  className="text-black cursor-pointer hover:text-[#aa071c] transition ease-in-out duration-300"
                  onClick={openCart}
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
        <hr className="border-t-2 border-gray-700 w-100" />
      </div>
      {isCartOpen && <CartModal onClose={closeCart} />}
    </div>
  );
};

export default Nav;
