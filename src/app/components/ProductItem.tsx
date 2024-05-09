import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query CatalogItems($shopIds: [ID!]!, $tagIds: [ID!]!) {
    catalogItems(shopIds: $shopIds, tagIds: $tagIds) {
      edges {
        node {
          ... on CatalogItemProduct {
            product {
              title
              description
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

const ProductItem = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      shopIds: ["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="],
      tagIds: ["cmVhY3Rpb24vdGFnOlF2cmozWG95U3NvS1BkM3hL"],
    },
  });

  useEffect(() => {
    console.log("product data is here", data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.catalogItems.edges.map((edge: any) => {
          const { node } = edge;
          const { product } = node;
          return (
            <div key={product._id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <div className="mt-2">
                {product.variants.map((variant: any) => (
                  <div key={variant._id} className="flex justify-between">
                    <p>{variant.title}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductItem;
