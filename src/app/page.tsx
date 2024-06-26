"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import Tags from "./components/Tags";
import "../app/globals.css";
import { GET_PRODUCTS, GET_TAGS } from "../app/queries";
import CardLoader from "./skeletonLoading/cardLoader";
import Card from "./components/Card";

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

  const { error: tagsError, data: tagsData } = useQuery(GET_TAGS);

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
    <div className="bg-[#f5f3ec]">
      <Tags tagsData={tagsData} search={search} setTagId={setTagId} />
      {productLoading ? <CardLoader /> : <Card productsData={productsData} />}
      <div className="flex justify-between mt-4 container mx-auto">
        {productsData.catalogItems.pageInfo.hasPreviousPage && (
          <button
            onClick={loadPrevProducts}
            className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800"
          >
            Previous
          </button>
        )}
        {productsData.catalogItems.pageInfo.hasNextPage && (
          <button
            onClick={loadMoreProducts}
            className="bg-primary text-white py-2 px-4 rounded flex bg-gray-800"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
