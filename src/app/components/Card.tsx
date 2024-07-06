import React from "react";
import Link from "next/link";
import Image from "next/image";

import placeholderimg from "../../../public/images/dummy-img.png";
import { CardProps } from "@/app/types";

const Card = ({
  title,
  imageUrl,
  href,
  price,
  imageWidth = 270,
  imageHeight = 150,
}: CardProps) => {
  const imageSrc = imageUrl || placeholderimg;

  return (
    <div className="relative m-5 flex w-full max-w-[270px] flex-col overflow-hidden bg-white transition-transform ease-in-out hover:shadow-md">
      <Link className="relative flex overflow-hidden" href={href}>
        <Image
          className="object-cover"
          src={imageSrc}
          alt="product image"
          width={imageWidth}
          height={imageHeight}
        />
      </Link>
      <div className="mt-4 px-3 pb-5">
        <h5 className="text-sm tracking-tight font-bold font-sans">{title}</h5>
        <div className="mt-2">
          <h5 className="text-sm tracking-tight text-right font-sans ml-auto">
            {price}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Card;
