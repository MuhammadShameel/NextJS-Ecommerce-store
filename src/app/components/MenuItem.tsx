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
          className={` ${
            isActive
              ? "  text-black bg-[#e9a70b]  border-[#e9a70b] border rounded-full p-2  "
              : "text-[#e9a70b] bg-transparent  border-[#e9a70b] border rounded-full p-2"
          } ${variant}`}
        >
          {text}
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
