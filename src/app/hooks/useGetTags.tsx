import { useQuery } from "@apollo/client";

import { GET_TAGS } from "../queries";
import { Tag } from "@/app/types";

export const useGetTags = (shopId: string) => {
  const { loading, error, data } = useQuery(GET_TAGS, {
    variables: { shopId },
  });
  const menuItems: Tag[] = data?.tags?.nodes || [];

  return { loading, error, data, menuItems };
};
