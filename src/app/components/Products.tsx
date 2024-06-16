import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CardLoader from "../skeletonLoading/cardLoader";
import Tags from "./Tags";
import placeholderimg from "../../../public/images/elementor-placeholder-image.webp";
import { GET_PRODUCTS, GET_TAGS } from "../queries";

const Products = () => {
  const [tagId, setTagId] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");

  const {
    loading: productsLoading,
    error,
    data: productsData,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      shopIds: ["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="],
      tagIds: tagId ? [tagId] : null,
    },
  });
  const { data: tagsData } = useQuery(GET_TAGS);

  useEffect(() => {
    if (search && tagsData) {
      const selectedTag = tagsData?.tags?.nodes?.find(
        (tag: any) => tag.slug === search
      );
      if (selectedTag) {
        setTagId(selectedTag._id);
      } else {
        setTagId("");
      }
    } else {
      setTagId("");
    }
  }, [search, tagsData]);

  const renderProductCards = () =>
    productsData?.catalogItems?.edges?.map((edge: any) => {
      const { product } = edge.node;
      return (
        <div
          key={product._id}
          className="product-card blur-bg relative flex flex-col overflow-hidden bg-white hover:shadow-md transition"
        >
          <Link href={`/products/${product.slug}`}>
            <Image
              className="object-fill aspect-[5/4] sm:mx-auto"
              src={product?.primaryImage?.URLs?.original || placeholderimg}
              alt="product image"
              width={300}
              height={300}
            />
          </Link>
          <div className="mt-4 px-3 pb-5">
            <Link href={`/products/${product.slug}`}>
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

  if (productsLoading) return <CardLoader />;
  if (error)
    return (
      <p className="container mx-auto text-red-600">Error: {error.message}</p>
    );

  return (
    <div className="container mx-auto font-open-sans">
      <div className="product-section p-6">
        <Tags />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {renderProductCards()}
        </div>
      </div>
    </div>
  );
};

export default Products;
