import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-center bg-no-repeat bg-[url('../../public/images/24.jpg')]  ">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h4 className=" text-3xl font-bold mb-4  tracking-tight leading-none text-black">
          CREATES A MODERATE CRUNCH
        </h4>
        <p className="mb-8 text-xl font-normal text-black lg:text-xl sm:px-16 lg:px-48">
          100% FRESH FOOD
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-black focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            SHOP NOW
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
  );
};

export default HeroSection;
