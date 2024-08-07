"use client";

import React from "react";
import Link from "next/link";

import { MenuItemProps } from "../types";
import "@/app/style/global.scss";

const MenuItem = ({ text, slug, isActive, variant }: MenuItemProps) => {
  return (
    <div className="mx-auto">
      <li className={`mr-5 capitalize`}>
        <Link
          href={`/?tag=${slug}`}
          scroll={false}
          className={`hover:text-black capitalize hover:bg-[#e9a70b] hover:opacity-100 hover:border-[#e9a70b] transition-colors duration-300 ease-in-out ${
            isActive
              ? "  text-black bg-[#e9a70b]  border-[#e9a70b] border rounded-full p-2  "
              : "text-[#272727] bg-transparent  border-[#272727] opacity-[0.3] border rounded-full p-2"
          } ${variant}`}
        >
          {text}
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
