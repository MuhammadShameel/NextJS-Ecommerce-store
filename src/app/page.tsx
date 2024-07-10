"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import MenuItem from "@/app/components/MenuItem";
import "@/app/globals.css";
import CardLoader from "@/app/skeletonLoading/cardLoader";
import Card from "@/app/components/Card";

import { useGetTags } from "@/app/hooks/useGetTags";
import { useGetProducts } from "@/app/hooks/useGetProducts";

export default function Home() {
  const [tagId, setTagId] = useState("");
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");

  const {
    loading: tagsLoading,
    error: tagsError,
    // data: tagsData,
    menuItems,
  } = useGetTags("cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ==");
  const slug = queryParameters.get("tag");

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useGetProducts(["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="], tagId);

  if (tagsError) return <p>Error: {productsError?.message}</p>;

  useEffect(() => {
    if (search && menuItems) {
      const selectedTag = menuItems.find((tag: any) => tag.slug === search);
      if (selectedTag) {
        setTagId(selectedTag._id);
      } else {
        setTagId("");
      }
    } else {
      setTagId("");
    }
  }, [search, menuItems]);

  if (tagsError || tagsError) return <p>Error loading data...</p>;

  return (
    <div className="bg-[#f5f3ec]">
      <div className="container mx-auto">
        <h3 className="text-center py-5 text-3xl text-black font-semibold">
          Experience the Art of Food
        </h3>
        <div className="flex  items-center justify-center py-7">
          <div className="flex">
            <ul className="flex">
              <li className="mr-5">
                <Link
                  href="/"
                  scroll={false}
                  className={`${
                    !slug || slug === "all-products"
                      ? "font-bold text-[#aa071c]"
                      : ""
                  }  hover-underline-animation text-[#000000] transition-colors duration-300 ease-in-out`}
                >
                  All Products
                </Link>
              </li>
              {tagsLoading
                ? [...Array(9)].map((_, index) => (
                    <li key={index} className="mr-5">
                      <div className="font-sans bg-gray-200 h-6 w-20 animate-pulse"></div>
                    </li>
                  ))
                : menuItems.map((menuItem) => {
                    const isActive = menuItem.slug === slug;
                    return (
                      <MenuItem
                        key={menuItem._id}
                        text={menuItem.displayTitle}
                        slug={menuItem.slug}
                        variant="primary"
                        isActive={isActive}
                      />
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="cards flex flex-wrap">
          {productsLoading ? (
            <CardLoader />
          ) : (
            productsData?.map((product: any) => {
              return (
                <Card
                  key={product.id}
                  href={`/products/${product.slug}`}
                  title={product.title}
                  slug={product.slug}
                  imageUrl={product.imageUrl}
                  price={product.price}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
