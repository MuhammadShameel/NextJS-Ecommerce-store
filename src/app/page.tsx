"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MenuItem from "@/app/components/MenuItem";
import "@/app/globals.css";
import CardLoader from "@/app/skeletonLoading/cardLoader";
import Card from "@/app/components/Card";
import { useGetTags } from "@/app/hooks/useGetTags";
import { useGetProducts } from "@/app/hooks/useGetProducts";
import Notification from "@/app/components/Notification";
import HeroSection from "./components/HeroSection";

export default function Home() {
  const [tagId, setTagId] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add search logic here, e.g., redirect or filter products
    console.log("Search term:", searchTerm);
  };

  const {
    loading: tagsLoading,
    error: tagsError,
    menuItems,
  } = useGetTags("cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ==");
  const slug = queryParameters.get("tag");

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useGetProducts(["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="], tagId);

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

  if (tagsError) return <p>Error: {tagsError?.message}</p>;
  if (productsError) return <p>Error: {productsError.message}</p>;

  return (
    <div className="bg-[#f4f1e9] ">
      <HeroSection />
      <div className="container mx-auto">
        <section className="offers-section px-4 top-[-50px] relative">
          <div className="flex lg:flex-row  flex-col justify-center md:flex-row lg:h-[300px]">
            <div className="w-full md:w-5/12 flex items-center   justify-start text-white p-8 bg-image-zoom-drinks">
              <div className="text-left z-10">
                <h2 className="text-2xl md:text-2xl font-bold mb-4">
                  Drinks Offer
                </h2>
                <p className="mb-4">Soft Drinks </p>
                <Link href={"/products/soft-drinks"}>
                  <button className="border border-white text-white bg-transparent px-4 py-2 rounded-full hover:bg-red-500 hover:border-red-500 transition duration-300 ease-in-out">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-4/12 flex items-center justify-start text-white p-8 bg-image-zoom-pizza">
              <div className="text-left  z-10">
                <h2 className="text-2xl md:text-2xl font-bold mb-4">
                  Pizza Offer
                </h2>
                <p className="mb-4">3 Small Pizaas +3 (345ml) Drinks</p>
                <Link
                  className="border border-white text-white bg-transparent px-4 py-2 rounded-full hover:bg-red-500 hover:border-red-500 transition duration-300 ease-in-out"
                  href={"/products/3-small-pizaas-3-345ml-drinks"}
                >
                  Order Now
                </Link>
              </div>
            </div>
            <div className="w-full md:w-3/12 flex items-center justify-start text-black p-8 bg-image-zoom-food">
              <div className="text-left  z-10">
                <h2 className="text-2xl md:text-2xl font-bold mb-4">
                  Explore Food
                </h2>
                <p className="mb-4">Order Your Favouriate Food</p>
                <button className="border border-black text-black bg-transparent px-4 py-2 hover:text-white rounded-full hover:bg-red-500 hover:border-red-500 transition duration-300 ease-in-out">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="px-5 mx-auto">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={handleChange}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 "
              placeholder="Search products..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
        <h3 className="text-center py-5 text-3xl text-black font-semibold ">
          Experience the Art of Food
        </h3>
        <div className="flex items-center justify-center py-7">
          <div className="flex">
            <ul className="flex flex-wrap">
              <li className="mr-5">
                <Link
                  href="/"
                  scroll={false}
                  className={` ${
                    !slug || slug === "all-products"
                      ? " text-black  bg-[#e9a70b] opacity-100  border-[#e9a70b] border rounded-full p-2"
                      : "border-[#272727] opacity-[0.3]"
                  } text-[#272727]  capitalize  border rounded-full p-2 transition-colors duration-300 ease-in-out`}
                >
                  All Products
                </Link>
              </li>
              {tagsLoading
                ? [...Array(9)].map((_, index) => (
                    <li key={index} className="mr-5 capitalize">
                      <div className="font-sans bg-gray-200  h-6 w-20 animate-pulse capitalize"></div>
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
        <div className="cards flex justify-center flex-wrap">
          {productsLoading ? (
            <CardLoader />
          ) : (
            productsData?.map((product: any) => {
              return (
                <Card
                  id={product.id}
                  product={product}
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
      <section className="bg-[url('../../public/images/back-30.jpg')] lg:bg-contain md:bg-contain  sm:bg-cover border-none bg-no-repeat bg-center">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-40">
          <h1 className=" lg:text-[80px] md:text-[60px] text-[50px] capitalize font-bold mb-4  tracking-tight leading-none text-white">
            15 MINUTES
          </h1>
          <p className="mb-8 text-xl font-bold text-white lg:text-xl sm:px-16 lg:px-48">
            You Order We Deliver
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex capitalize rounded-full justify-center items-center py-3 px-5 text-base font-medium text-center text-white  border border-white hover:bg-black hover:text-white hover:border-black transition-colors ease-in-out delay-75"
            >
              Make an order
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <div className="container mx-auto">
        <section className="bottom-offers-section sm:px-20 px-5 bottom-[-80px] relative">
          <div className="flex lg:flex-row  flex-col justify-center md:flex-row lg:h-[400px] ">
            <div className="w-full md:w-3/12 flex items-center   justify-start text-white p-8 bg-image-zoom-healthy-pizza">
              <div className="text-left z-10">
                <h2 className="text-2xl md:text-2xl font-bold capp-5 mb-4">
                  PIZZA HEALTHILY
                </h2>
                <p className="mb-4  md:pr-24">
                  Healthily Everything you order will be quickly delivered to
                  your door.{" "}
                </p>
                <h2 className="text-2xl md:text-2xl font-bold mb-4">$10.00</h2>
              </div>
            </div>
            <div className="w-full md:w-5/12 flex items-center justify-start text-white p-8  bg-image-zoom-short-drink">
              <div className="text-left  z-10">
                <h2 className="text-2xl md:text-2xl font-bold mb-4">
                  SHORT COMBO DRINK
                </h2>
                <p className="mb-4 md:pr-40">
                  Everything you order will be quickly delivered to your door.
                </p>
                <h2 className="text-2xl md:text-2xl font-bold mb-4">$15.00</h2>
              </div>
            </div>
            <div className="w-full md:w-3/12 flex items-center justify-start text-white p-8   bg-image-zoom-single-product">
              <div className="text-left  z-10">
                <h2 className="text-2xl md:text-2xl font-bold capp-5 mb-4">
                  SINGLE PRODUCT
                </h2>
                <p className="mb-4  md:pr-24">
                  Everything you order will be quickly delivered to your door.
                </p>
                <h2 className="text-2xl md:text-2xl font-bold mb-4">$16.00</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-[url('../../public/images/back-bottom.jpg')] bg-cover border-none bg-no-repeat bg-center">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <div className="flex items-center flex-col cursor-pointer py-14 hover:scale-105 hover:transition-transform  hover:shadow-xl ease-in-out delay-75 justify-center bg-white rounded-3xl p-5">
              <h5 className="text-md justify-center  flex tracking-tight font-bold font-sans">
                FREE SHIPPING ORDER
              </h5>
              <h5 className="text-md justify-center text-[#5a5a5a]  flex tracking-tight  font-sans">
                Sign up for updates and get free shipping.
              </h5>
            </div>
            <div className="flex items-center flex-col cursor-pointer py-14 hover:scale-105 hover:transition-transform  hover:shadow-xl ease-in-out delay-75 justify-center bg-white rounded-3xl p-5">
              <h5 className="text-md justify-center  flex tracking-tight font-bold font-sans">
                15 MINUTES DELIVERY
              </h5>
              <h5 className="text-md justify-center text-[#5a5a5a]  flex tracking-tight  font-sans">
                You order us fast and easy delivery
              </h5>
            </div>
            <div className="flex items-center flex-col cursor-pointer py-14 hover:scale-105 hover:transition-transform  hover:shadow-xl ease-in-out delay-75 justify-center bg-white rounded-3xl p-5">
              <h5 className="text-md justify-center  flex tracking-tight font-bold font-sans">
                BEST QUALITY
              </h5>
              <h5 className="text-md justify-center text-[#5a5a5a]  flex tracking-tight  font-sans">
                Chefs and cook have many years of experience.
              </h5>
            </div>
            <div className="flex items-center flex-col cursor-pointer py-14 hover:scale-105 hover:transition-transform  hover:shadow-xl ease-in-out delay-75 justify-center bg-white rounded-3xl p-5">
              <h5 className="text-md justify-center  flex tracking-tight font-bold font-sans">
                MEMBERSHIP CARD V.I.P
              </h5>
              <h5 className="text-md justify-center text-[#5a5a5a]  flex tracking-tight  font-sans">
                10% off next purchase for V.I.P card
              </h5>
            </div>
          </div>
        </div>
      </section>

      {/* Conditionally render the notification */}
      {showNotification && <Notification message="Item added to cart!" />}
    </div>
  );
}
