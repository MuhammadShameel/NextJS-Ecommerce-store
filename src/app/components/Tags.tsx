import React, { useState } from "react";
import Link from "next/link";
import { MdFilterAlt } from "react-icons/md";

const Tags = ({ tagsData, search, setTagId }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAllProductsClick = () => {
    setTagId("");
  };

  const renderDropdownMenu = () => (
    <ul className="absolute z-10 top-full rounded-lg mt-4 left-0 w-[140px] bg-white text-gray-500 shadow-lg py-1">
      <li>
        <Link
          href="/"
          className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out ms-2 mt-2"
          onClick={handleAllProductsClick}
        >
          All Products
        </Link>
      </li>
      {tagsData?.tags?.nodes?.map((menuItem: any) => (
        <li key={menuItem._id} className="mr-5">
          <Link
            href={`/?tag=${menuItem.slug}`}
            className="text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out ms-2"
            onClick={() => {
              setTagId(menuItem._id);
              setIsDropdownOpen(false);
            }}
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
            !search ? "text-red-500 font-extrabold" : ""
          } text-gray-500 hover:text-primary transition-colors duration-300 ease-in-out`}
          onClick={handleAllProductsClick}
        >
          All Products
        </Link>
      </li>
      {tagsData?.tags?.nodes?.map((menuItems: any) => {
        const isActive = search === menuItems.slug;
        return (
          <li key={menuItems._id} className="mr-5">
            <Link
              href={`/?tag=${menuItems.slug}`}
              className={`${
                isActive ? "text-red-500 font-extrabold" : ""
              } text-gray-500 transition-colors duration-300 ease-in-out`}
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
  );

  return (
    <div className="container mx-auto font-open-sans bg-[#f5f3ec]">
      <div className="product-section p-6">
        <h2 className="text-center">Experience the Art of Food</h2>
        <nav className="flex items-center justify-between  py-7">
          <div className="flex">
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
            {renderLargeScreenMenu()}
          </div>
          <button className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800">
            <MdFilterAlt className="text-xl mr-1" />
            Filter
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Tags;
