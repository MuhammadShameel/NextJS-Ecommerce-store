"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import DetailCardLoader from "@/app/skeletonLoading/detailCardLoader";
import placeholderimg from "../../../../public/images/elementor-placeholder-image.webp";
import { GET_PRODUCT_DETAILS } from "@/app/queries";
import { Product, Variant } from "@/app/types";

const ProductDetail = () => {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const { loading, error, data } = useQuery<{
    catalogItemProduct: { product: Product };
  }>(GET_PRODUCT_DETAILS, {
    variables: {
      shopId: "",
      slugOrId: slug,
    },
  });

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  if (loading) return <DetailCardLoader />;
  if (error) {
    console.error("Error fetching product details:", error);
    return (
      <p className="container mx-auto text-red-600">Error: {error.message}</p>
    );
  }

  const product = data?.catalogItemProduct?.product;

  if (!product) {
    return <p className="container mx-auto text-red-600">Product not found</p>;
  }

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const renderPrice = (variant: Variant) => {
    return <>{variant.pricing[0].displayPrice}</>;
  };

  return (
    <div className="container mx-auto p-4 blur-bg my-10 bg-[#f5f3ec]">
      <div className="flex flex-col bg-white lg:flex-row +bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-6">
        <div className="lg:w-1/2">
          <div className="my-10 md:flex md:justify-center sm:flex sm:justify-center">
            <Image
              src={product?.primaryImage?.URLs?.original || placeholderimg}
              alt={product.title || "Product image"}
              className="object-contain lg:aspect-[3/2]"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="lg:w-1/2 p-10 flex flex-col self-center">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="mt-4">
            <p className="text-xl font-semibold">
              {selectedVariant
                ? renderPrice(selectedVariant)
                : renderPrice(product.variants[0])}
            </p>
            <div className="flex space-x-2 mt-2">
              <span className="bg-gray-200 p-2 rounded">
                {selectedVariant
                  ? selectedVariant.title
                  : product.variants[0].title}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-medium">Select :</h2>
            <div className="flex space-x-2 mt-2">
              {product.variants.map((variant: Variant) => (
                <button
                  key={variant._id}
                  className={`border p-2 rounded ${
                    selectedVariant?._id === variant._id
                      ? "bg-black text-white transition duration-300"
                      : ""
                  }`}
                  onClick={() => handleVariantSelect(variant)}
                >
                  {variant.optionTitle}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 w-full rounded mt-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
