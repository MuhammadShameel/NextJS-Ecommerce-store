"use client";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import jeansProduct from "../../../public/images/joggers.png";
import Image from "next/image";

import { MdFilterAlt } from "react-icons/md";

const Products = () => {
  const [tagId, setTagId] = useState("");

  const GET_TAGS = gql`
    query {
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
        tagIds: ["${tagId}"]
      ) {
        edges {
          node {
            ... on CatalogItemProduct {
              product {
                title
                description
                pricing{
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_TAGS, {
    variables: {
      shopIds: ["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="],
      tagIds: ["cmVhY3Rpb24vdGFnOlF2cmozWG95U3NvS1BkM3hL"],
    },
  });
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");
  useEffect(() => {
    console.log("xyz");
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center container mx-auto border border-gray-200 rounded-lg bg-gray-50 h-40">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error loading menu items: {error.message}</p>;

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
                        href="#tshirt"
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
                    href="#tshirt"
                    className={`${
                      !search ? "font-bold text-black" : ""
                    } text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out`}
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
                          isActive ? "font-bold text-black" : ""
                        } text-gray-500  transition-colors duration-300 ease-in-out`}
                        onClick={() => {
                          setTagId(menuItems._id);
                        }}
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
            {data.catalogItems.edges.map((edge: any) => {
              const { node } = edge;
              const { product } = node;
              return (
                <div
                  key={product._id}
                  className="product-card relative flex flex-col overflow-hidden bg-white hover:shadow-md transition"
                >
                  <Link className="relative flex overflow-hidden" href="#">
                    <Image
                      className="object-cover sm:mx-auto"
                      src={jeansProduct}
                      alt="product image"
                    />
                  </Link>
                  <div className="mt-4 px-3 pb-5">
                    <Link href="#">
                      <h5 className="text-sm tracking-tight">
                        {product.title}
                      </h5>
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <h5 className="text-sm tracking-tight text-gray-400">
                        {product.description}
                      </h5>
                    </div>
                    <div className="mt-2 flex justify-between">
                      {product.variants.map((variant: any) => (
                        <p key={variant._id} className="text-xs text-gray-500">
                          {variant.title}
                        </p>
                      ))}
                      {product.pricing.map((price: any, index: number) => (
                        <h5 key={index} className="text-sm tracking-tight">
                          {price.displayPrice}
                        </h5>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="product-card relative flex flex-col overflow-hidden bg-white hover:shadow-md transition">
              <Link className="relative flex overflow-hidden " href="#">
                <Image
                  className="object-cover sm:mx-auto"
                  src={jeansProduct}
                  alt="product image"
                />
              </Link>
              <div className="mt-4 px-3 pb-5">
                <Link href="#">
                  <h5 className="text-sm tracking-tight ">
                    Adicolor Classics Joggers
                  </h5>
                </Link>
                <div className="mt-2  flex items-center justify-between">
                  <h5 className="text-sm tracking-tight text-gray-400">
                    Dress
                  </h5>
                  <h5 className="text-sm tracking-tight ">$63.85</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
