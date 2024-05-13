"use client";
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SkeletonLoader from "./SkeletonLoader";
import AllProducts from "./AllProducts";

import food from "../../../public/images/food-card.jpg";
import Image from "next/image";

import { MdFilterAlt } from "react-icons/md";

const GET_DATA = gql`
  query ($tagIds: [ID!]) {
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
              title
              description
              pricing {
                displayPrice
              }
              _id
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
`;
const Products = () => {
  const [tagId, setTagId] = useState("");

  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {
      tagIds: tagId ? [tagId] : null,
    },
  });
  const [showAllProducts, setShowAllProducts] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");

  const handleAllProductsClick = () => {
    setTagId("");
    setShowAllProducts(false);
  };

  if (loading)
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  if (error)
    return (
      <p className="container mx-auto text-red-600">Error : {error.message}</p>
    );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // console.log("I am data", data);
  console.log("catalog items", data.catalogItems);

  return (
    <div className="container mx-auto font-open-sans">
      <div className="product-section p-6">
        <h2 className="text-center">Or subscribe to the newsletter</h2>
        <div>
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
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <ul className="absolute z-10 top-full rounded-lg mt-4 left-0 w-[140px] bg-white text-gray-500 shadow-lg py-1">
                    <li>
                      <Link
                        href="/"
                        className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out ms-2 mt-2"
                      >
                        All Products
                      </Link>
                    </li>
                    {data.tags.nodes.map((menuItem: any) => (
                      <li key={menuItem.id} className="mr-5">
                        <Link
                          href={`#${menuItem.slug}`}
                          className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out ms-2"
                        >
                          {menuItem.displayTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Large Screen Menu */}
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
                {data.tags.nodes.map((menuItems: any) => {
                  const isActive = search === menuItems.slug;
                  return (
                    <li key={menuItems.id} className="mr-5">
                      <Link
                        href={{
                          query: { tag: menuItems.slug },
                        }}
                        className={`${
                          isActive ? " text-red-500" : ""
                        } text-gray-500  transition-colors duration-300 ease-in-out`}
                        onClick={() => {
                          setTagId(menuItems._id);
                        }}
                        scroll={false}
                      >
                        {menuItems.displayTitle}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800">
              <MdFilterAlt className="text-xl mr-1" />
              Filter
            </button>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showAllProducts ? (
              <AllProducts />
            ) : (
              data.catalogItems.edges.map((edge: { node: any }) => {
                const { node } = edge;
                const { product } = node;
                return (
                  <div
                    key={product._id}
                    className="product-card relative flex flex-col overflow-hidden bg-white hover:shadow-md transition"
                  >
                    <Link href="#">
                      <Image
                        className="object-cover sm:mx-auto"
                        src={food}
                        alt="product image"
                      />
                    </Link>
                    <div className="mt-4 px-3 pb-5">
                      <Link href="#">
                        <h5 className="text-sm tracking-tight">
                          {product.title}
                        </h5>
                      </Link>
                      <div className="mt-2 flex justify-between">
                        {product.pricing.map(
                          (
                            price: {
                              displayPrice: any;
                            },
                            index: React.Key | null | undefined
                          ) => (
                            <h5
                              key={index}
                              className="text-sm ms-auto tracking-tight"
                            >
                              {price.displayPrice}
                            </h5>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
