"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import placeholderimg from "../../../public/images/dummy-img-white.png";
import { CardProps } from "@/app/types";

const Card = ({ title, imageUrl, href, price }: CardProps) => {
  const imageSrc = imageUrl || placeholderimg;

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
        <h5 className="text-sm justify-center flex tracking-tight font-bold font-sans">
          {title}
        </h5>
        <div className="mt-2">
          <h5 className="text-sm text-red-500 tracking-tight text-right font-sans flex justify-center">
            {price}
          </h5>
        </div>

        <div className="mt-2 flex justify-center">
          <button className="border border-black py-2 px-4 hover:bg-[#e9a70b] hover:border-[#e9a70b] rounded-full transition-colors duration-300 ease-in-out">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
