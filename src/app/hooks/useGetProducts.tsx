// src/hooks/useGetProducts.ts
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries";

export const useGetProducts = (shopIds: string[], tagId?: string) => {
  const tagIds = tagId ? [tagId] : null;
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { shopIds, tagIds },
  });

  const productData =
    data?.catalogItems?.edges
      ?.map((edge: any) => {
        if (
          !edge?.node ||
          edge.node.__typename !== "CatalogItemProduct" ||
          !edge.node.product
        ) {
          return null;
        }
        const { _id, title, slug, pricing, primaryImage } = edge.node.product;
        return {
          id: _id,
          title,
          slug,
          imageUrl: primaryImage?.URLs?.original || "",
          price: pricing[0]?.displayPrice || "",
        };
      })
      .filter((item: any) => item !== null) || []; // Ensure it's always an array

  return { loading, error, data: productData };
};
