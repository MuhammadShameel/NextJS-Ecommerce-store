"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "../../../__generated__/gql";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

import SkeletonLoader from "./SkeletonLoader";
import AllProducts from "./AllProducts";
import food from "../../../public/images/burger.jpg";

import { MdFilterAlt } from "react-icons/md";

// GraphQL Query
const GET_DATA = gql(/* GraphQL */ `
  query GetProducts($tagIds: [ID!]) {
    tags(shopId: "cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ==") {
      nodes {
        _id
        name
        displayTitle
        slug
      }
    }
    catalogItems(
      shopIds: ["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="]
      tagIds: $tagIds
    ) {
      edges {
        node {
          ... on CatalogItemProduct {
            product {
              productId
              title
              description
              pricing {
                displayPrice
              }
              _id
              slug
              variants {
                _id
                title
                media {
                  URLs {
                    small
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

const Products = () => {
  const [tagId, setTagId] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");

  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {
      tagIds: tagId ? [tagId] : null,
    },
  });

  useEffect(() => {
    if (search && data) {
      const selectedTag = data?.tags?.nodes?.find(
        (tag: any) => tag.slug === search
      );
      if (selectedTag) {
        setTagId(selectedTag._id);
      }
    }
  }, [search, data]);

  const handleAllProductsClick = () => {
    setTagId("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderDropdownMenu = () => (
    <ul className="absolute z-10 top-full rounded-lg mt-4 left-0 w-[140px] bg-white text-gray-500 shadow-lg py-1">
      <li>
        <Link
          href="/"
          className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out ms-2 mt-2"
        >
          All Products
        </Link>
      </li>
      {data?.tags?.nodes?.map((menuItem: any) => (
        <li key={menuItem._id} className="mr-5">
          <Link
            href={`#${menuItem.slug}`}
            className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out ms-2"
          >
            {menuItem.displayTitle}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderLargeScreenMenu = () => (
    <ul className="hidden lg:flex">
      <li className="mr-5">
        <Link
          href="/"
          className={`${
            !search ? " text-red-500" : ""
          } text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out`}
          onClick={handleAllProductsClick}
          scroll={false}
        >
          All Products
        </Link>
      </li>
      {data?.tags?.nodes?.map((menuItems: any) => {
        const isActive = search === menuItems.slug;
        return (
          <li key={menuItems._id} className="mr-5">
            <Link
              href={{
                query: { tag: menuItems.slug },
              }}
              className={`${
                isActive ? " text-red-500" : ""
              } text-gray-500  transition-colors duration-300 ease-in-out`}
              onClick={() => {
                setTagId(menuItems._id);
                setShowAllProducts(false);
              }}
              scroll={false}
            >
              {menuItems.displayTitle}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const renderProductCards = () =>
    data?.catalogItems?.edges?.map((edge: any) => {
      const { product } = edge.node;
      return (
        <div
          key={product._id}
          className="product-card blur-bg relative flex flex-col overflow-hidden bg-white hover:shadow-md transition"
        >
          <Link href={`/products/${product.slug}`}>
            <Image
              className="object-cover sm:mx-auto"
              src={food}
              alt="product image"
            />
          </Link>
          <div className="mt-4 px-3 pb-5">
            <Link href={`/product/${product.slug}`}>
              <h5 className="text-sm tracking-tight">{product.title}</h5>
            </Link>
            <div className="mt-2 flex justify-between">
              <h5 className="text-sm ms-auto tracking-tight text-black">
                {product.pricing.displayPrice}
              </h5>
            </div>
          </div>
        </div>
      );
    });

  if (loading) return <SkeletonLoader />;
  if (error)
    return (
      <p className="container mx-auto text-red-600">Error: {error.message}</p>
    );

  return (
    <div className="container mx-auto font-open-sans">
      <div className="product-section p-6">
        <h2 className="text-center">Experience the Art of Food</h2>
        <nav className="flex items-center justify-between bg-white py-7">
          <div className="flex">
            {/* Medium Screen Dropdown */}
            <div className="relative lg:hidden">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between bg-transparent text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {isDropdownOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6H16V8H4V6ZM4 11H16V13H4V11ZM4 16H16V18H4V16Z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 6H17V8H3V6ZM3 11H17V13H3V11ZM3 16H17V18H3V16Z"
                    />
                  )}
                </svg>
              </button>
              {isDropdownOpen && renderDropdownMenu()}
            </div>
            {/* Large Screen Menu */}
            {renderLargeScreenMenu()}
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800">
            <MdFilterAlt className="text-xl mr-1" />
            Filter
          </button>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {showAllProducts ? <AllProducts /> : renderProductCards()}
        </div>
      </div>
    </div>
  );
};

export default Products;
