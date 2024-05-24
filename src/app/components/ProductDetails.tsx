import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import SkeletonLoader from "./SkeletonLoader";

const GET_PRODUCT_DETAILS = gql`
  query catalogItemProduct($shopId: ID!, $slugOrId: String!) {
    catalogItemProduct(shopId: $shopId, slugOrId: $slugOrId) {
      product {
        title
        description
        variants {
          _id
          title
          attributeLabel
          optionTitle
          pricing {
            displayPrice
            price
            currency {
              code
            }
          }
        }
        primaryImage {
          URLs {
            medium
            original
          }
        }
      }
    }
  }
`;

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      shopId: "cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ==",
      slugOrId: id,
    },
  });

  if (loading) return <SkeletonLoader />;
  if (error)
    return (
      <p className="container mx-auto text-red-600">Error: {error.message}</p>
    );

  const product = data?.catalogItemProduct?.product;

  return (
    <div className="container mx-auto font-open-sans">
      <div className="product-detail-section p-6">
        <h1 className="text-center">{product.title}</h1>
        <div className="product-image">
          <Image
            src={product.primaryImage.URLs.original}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>
        <div className="product-description mt-4">
          <p>{product.description}</p>
        </div>
        <div className="product-variants mt-4">
          {product.variants.map((variant: any) => (
            <div key={variant._id} className="variant">
              <h3>{variant.title}</h3>
              <p>
                {variant.attributeLabel}: {variant.optionTitle}
              </p>
              <p>
                {variant.pricing.displayPrice} ({variant.pricing.currency.code})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
