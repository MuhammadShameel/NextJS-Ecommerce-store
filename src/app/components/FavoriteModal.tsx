"use client";

import React from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useFavorites } from "@/app/context/FavoriteContext";
import cartPlaceholder from "../../../public/images/catering-item-placeholder.png";

const FavoriteModal = ({ onClose }: { onClose: () => void }) => {
  const { favorites, removeFromFavorites } = useFavorites();

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
                        Favorite Products
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
                    {favorites.length === 0 ? (
                      <p className="text-center my-36">No favorite products.</p>
                    ) : (
                      <div>
                        {favorites.map((product) => (
                          <div className="mt-8" key={product._id}>
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={
                                        product.primaryImage?.URLs?.original ||
                                        cartPlaceholder
                                      }
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center"
                                      width={96}
                                      height={96}
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{product.title}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-[#aa071c] hover:text-[#aa071c]"
                                          onClick={() =>
                                            removeFromFavorites(product._id)
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
