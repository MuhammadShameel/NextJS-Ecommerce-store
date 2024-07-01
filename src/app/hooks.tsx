// import { useQuery } from "@apollo/client";
// import { GET_PRODUCTS, GET_TAGS, GET_PRODUCT_DETAILS } from "./queries";

// export const useGetProducts = (shopIds: string[], tagIds?:string[]) => {
//   const { loading, error, data } = useQuery(GET_PRODUCTS, {
//     variables: { shopIds, tagIds },
//   });
//   return { loading, error, data };
// };

// export const useGetTags = (shopId:  string) => {
//   const { loading, error, data } = useQuery(GET_TAGS, {
//     variables: { shopId },
//   });
//   return { loading, error, data };
// };

// export const useGetProductDetails = (shopId: string, slugOrId: string) => {
//   const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
//     variables: { shopId, slugOrId },
//   });
//   return { loading, error, data };
// };
