"use client";

import { useEffect, useState } from "react";
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
  const { error: tagsError, data: tagsData } = useQuery(GET_TAGS);

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

  // const { error: tagsError, data: tagsData } = useQuery(GET_TAGS);

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
      <div className="container mx-auto">
        <div className="cards flex flex-wrap">
          {productLoading ? (
            <CardLoader />
          ) : (
            productsData?.catalogItems?.edges?.map((edge: any) => {
              if (
                !edge?.node ||
                edge.node.__typename !== "CatalogItemProduct" ||
                !edge.node.product
              ) {
                return null;
              }
              return (
                <Card key={edge.node.product._id} product={edge.node.product} />
              );
            })
          )}
        </div>
      </div>
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
