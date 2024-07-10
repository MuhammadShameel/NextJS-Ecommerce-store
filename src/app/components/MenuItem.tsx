"use client";

import React from "react";
import Link from "next/link";

import { MenuItemProps } from "../types";
import "@/app/style/global.scss";

const MenuItem = ({ text, slug, isActive, variant }: MenuItemProps) => {
  return (
    <div className="mx-auto">
      <li className={`mr-5`}>
        <Link
          href={`/?tag=${slug}`}
          scroll={false}
          className={`hover-underline-animation ${
            isActive ? " font-bold text-[#aa071c]  " : ""
          } ${variant}`}
        >
          {text}
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
