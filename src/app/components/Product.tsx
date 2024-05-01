import React from "react";
import jeansProduct from "../../../public/images/image-product-3.png";
import Image from "next/image";

const Product = () => {
  return (
    <div className="container mx-auto">
      <div className="p-6">
        <h2 className="text-center">Or subscribe to the newsletter</h2>
        <div className="relative m-5 flex w-full max-w-[312px] flex-col overflow-hidden bg-white hover:shadow-md ">
          <a className="relative flex overflow-hidden " href="#">
            <Image
              className="object-cover"
              src={jeansProduct}
              alt="product image"
            />
            <span className="absolute top-0 left-0 my-4 bg-primary px-2 text-center text-sm font-medium text-white">
              39% OFF
            </span>
          </a>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-sm tracking-tight ">
                Adicolor Classics Joggers
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <h5 className="text-sm tracking-tight text-gray-400">Dress</h5>
              <h5 className="text-sm tracking-tight ">$63.85</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
