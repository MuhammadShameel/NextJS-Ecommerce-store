"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
// import Tags from "./components/Tags";
import MenuItem from "./components/MenuItem";
import "../app/globals.css";
import { GET_PRODUCTS, GET_TAGS } from "../app/queries";
import CardLoader from "./skeletonLoading/cardLoader";
import TagsLoader from "./skeletonLoading/tagsLoader";
import Card from "./components/Card";
import { useGetTags } from "./hooks/useGetTags";
import { ProductListProps, Tag } from "./types";
import Link from "next/link";

export default function Home() {
  const [tagId, setTagId] = useState("");
  const [productLoading, setProductLoading] = useState(false);
  const [cursor, setCursor] = useState({ after: null, before: null });
  const queryParameters = useSearchParams();
  const search = queryParameters.get("tag");

  const {
    loading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useGetTags("cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ==");
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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

  useEffect(() => {
    const tag = searchParams.get("tag");
    if (tag) {
      setSelectedItem(tag);
    } else {
      setSelectedItem("all-products");
    }
  }, [searchParams]);

  useEffect(() => {
    if (tagsData) {
      if (selectedItem && selectedItem !== "all-products") {
        const selectedTag = tagsData.tags.nodes.find(
          (tag: Tag) => tag.slug === selectedItem
        );
        if (selectedTag) {
          setSelectedTagId(selectedTag._id);
        } else {
          setSelectedTagId(null);
        }
      } else {
        setSelectedTagId(null);
      }
    }
  }, [tagsData, selectedItem]);

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

  if (tagsError || tagsError) return <p>Error loading data...</p>;

  const handleMenuItemClick = (slug: string) => {
    setSelectedItem(slug);
  };

  if (productsLoading) return <CardLoader />;
  if (tagsError) return <p>Error: {productsError?.message}</p>;

  const menuItems: Tag[] = tagsData?.tags?.nodes || [];

  return (
    <div className="bg-[#f5f3ec]">
      {/* <Tags tagsData={tagsData} search={search} setTagId={setTagId} /> */}
      <div className="container mx-auto">
        <h2 className="text-center py-5">Experience the Art of Food</h2>
        <div className="flex  items-center justify-between py-7">
          <div className="flex">
            <ul className="flex">
              <li className="mr-5">
                <Link
                  href="/"
                  scroll={false}
                  className={`${
                    !selectedItem || selectedItem === "all-products"
                      ? "font-bold"
                      : ""
                  } hover:text-red-500 text-[#000000] transition-colors duration-300 ease-in-out`}
                >
                  All Products
                </Link>
              </li>
              {tagsLoading ? (
                <TagsLoader />
              ) : (
                // ? [...Array(9)].map((_, index) => (
                //     <li key={index} className="mr-5">
                //       <div className="font-sans bg-gray-200 h-6 w-20 animate-pulse"></div>
                //     </li>
                //   ))
                menuItems.map((menuItem) => {
                  const isActive = menuItem.slug === selectedItem;
                  return (
                    <MenuItem
                      key={menuItem._id}
                      onClick={handleMenuItemClick}
                      text={menuItem.displayTitle}
                      slug={menuItem.slug}
                      variant="primary"
                      isActive={isActive}
                    />
                  );
                })
              )}
            </ul>
          </div>
          <button className="text-white py-2 px-4 rounded flex align-middle bg-gray-800 hover:bg-red-500 font-sans">
            <i className="fa-solid fa-filter text-lg mr-1 mt-1"></i>
            Filter
          </button>
        </div>
      </div>
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
