"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/client";
import Product from "./components/Products";
import Tags from "./components/Tags";
import "../app/globals.css";
import { GET_PRODUCTS, GET_TAGS } from "../app/queries";
import TagsLoader from "./skeletonLoading/tagsLoader";
import CardLoader from "./skeletonLoading/cardLoader";
import Products from "./components/Products";

export default function Home() {
  const [tagId, setTagId] = useState("");
  const [productLoading, setProductLoading] = useState(false);

  const [cursor, setCursor] = useState({ after: null, before: null });
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
    refetch: refetchProducts,
    fetchMore,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      shopIds: ["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="],
      tagIds: tagId ? [tagId] : null,
      first: 8,
      after: cursor.after,
      before: cursor.before,
    },
  });

  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useQuery(GET_TAGS);

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

  useEffect(() => {
    if (tagId !== "") {
      setProductLoading(true);
      refetchProducts({
        shopIds: ["cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ=="],
        tagIds: tagId ? [tagId] : null,
      }).finally(() => setProductLoading(false));
    }
  }, [tagId, refetchProducts]);

  const loadMoreProducts = () => {
    fetchMore({
      variables: {
        after: productsData.catalogItems.pageInfo.endCursor,
      },
    }).then((fetchMoreResult) => {
      setCursor({
        after: fetchMoreResult.data.catalogItems.pageInfo.endCursor,
        before: null,
      });
    });
  };

  const loadPrevProducts = () => {
    fetchMore({
      variables: {
        before: productsData.catalogItems.pageInfo.startCursor,
      },
    }).then((fetchMoreResult) => {
      setCursor({
        after: null,
        before: fetchMoreResult.data.catalogItems.pageInfo.startCursor,
      });
    });
  };

  if (productsLoading) return <CardLoader />;
  if (tagsError) return <p>Error: {productsError?.message}</p>;

  return (
    <div>
      <Tags tagsData={tagsData} search={search} setTagId={setTagId} />
      {/* <Product productsData={productsData} /> */}
      {productLoading ? (
        <CardLoader />
      ) : (
        <Products
          productsData={productsData}
          loadMoreProducts={loadMoreProducts}
          loadPrevProducts={loadPrevProducts}
        />
      )}
    </div>
  );
}
