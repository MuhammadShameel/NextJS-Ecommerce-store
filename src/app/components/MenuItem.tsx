"use client";
import React from "react";

interface Props {
  variant: "primary" | "secondary";
}

const MenuItem = (props: Props) => {
  return (
    <li className="hover:text-primary transition-colors lg:block hidden duration-300 ease-in-out">
      Jewelry & Accessories
    </li>
  );
};
export default MenuItem;
