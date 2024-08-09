"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdFavorite } from "react-icons/md";
import { useFavorites } from "@/app/context/FavoriteContext";
import placeholderimg from "../../../public/images/dummy-img-white.png";
import { CardProps } from "@/app/types";
import { StaticImageData } from "next/image";

const Card = ({ id, title, imageUrl, href, price }: CardProps) => {
  const imageSrc = imageUrl || placeholderimg;
  const { state, dispatch } = useFavorites();

  // Check if the product is already in favorites when the component mounts
  const isAlreadyFavorite = state.items.some((item) => item.id === id);

  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);

  const getImageUrl = (image: string | StaticImageData): string => {
    if (typeof image === "string") {
      return image;
    } else {
      return image.src;
    }
  };

  const handleAddToFavorites = () => {
    if (isFavorite) {
      // Remove from favorites
      dispatch({ type: "REMOVE_FROM_FAVORITES", id });
    } else {
      // Add to favorites
      const product = {
        id,
        title,
        imageUrl: getImageUrl(imageUrl),
        pricing: [{ displayPrice: price }],
        href,
      };
      dispatch({ type: "ADD_TO_FAVORITES", payload: product });
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative m-5 flex w-full max-w-[270px] flex-col overflow-hidden rounded-3xl bg-white transition-transform ease-in-out hover:shadow-md">
      <Link className="relative flex overflow-hidden" href={href}>
        <Image
          className="object-cover"
          src={imageSrc}
          alt="product image"
          width={270}
          height={150}
        />
      </Link>
      <div className="mt-4 px-3 pb-5">
        <h5 className="text-md justify-center flex tracking-tight font-bold font-sans">
          {title}
        </h5>
        <div className="mt-2">
          <h5 className="text-sm text-red-500 tracking-tight font-bold text-right font-sans flex justify-center">
            {price}
          </h5>
        </div>

        <div className="mt-2 flex justify-center">
          <button className="border border-black py-2 px-4 w-full hover:bg-[#e9a70b] hover:border-[#e9a70b] rounded-full transition-colors duration-300 ease-in-out">
            Add to cart
          </button>
          <button
            onClick={handleAddToFavorites}
            className={`text-gray-500 absolute top-4 right-4 transition-colors duration-300 ease-in-out ${
              isFavorite ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <MdFavorite size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
