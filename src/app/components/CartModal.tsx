"use client";

import React from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useCart } from "@/app/context/CartContext";
import cartPlaceholder from "../../../public/images/catering-item-placeholder.png";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart } = useCart();

  const parsePrice = (price: string) => {
    const cleanedPrice = price.replace(/[^\d.]/g, "");
    const finalPrice = cleanedPrice.replace(/^\./, "");
    return parseFloat(finalPrice);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = parsePrice(item.variant.pricing[0].displayPrice);
      return total + itemPrice * item.quantity;
    }, 0);
  };

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>

                          <IoMdClose className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {cart.length === 0 ? (
                      <p className="text-center my-36">Your cart is empty.</p>
                    ) : (
                      <div>
                        {cart.map((item) => (
                          <div
                            className="mt-8"
                            key={`${item.product._id}-${item.variant._id}`}
                          >
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={
                                        item.product.primaryImage?.URLs
                                          ?.original || cartPlaceholder
                                      }
                                      alt={item.product.title}
                                      className="h-full w-full object-cover object-center"
                                      width={96}
                                      height={96}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{item.product.title}</a>
                                        </h3>
                                        <p className="ml-4">
                                          {item.variant.pricing[0].displayPrice}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.variant.title}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {item.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-[#aa071c] hover:text-[#aa071c]"
                                          onClick={() =>
                                            removeFromCart(
                                              item.product._id,
                                              item.variant._id
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Rs. {getTotalPrice().toFixed(2)}</p>
                    </div>

                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-[#aa071c] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#aa071c]"
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
