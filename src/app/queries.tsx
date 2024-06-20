import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql(`
  query CatalogItemProduct($shopIds: [ID!]!, $tagIds: [ID!],$first: ConnectionLimitInt, $after: ConnectionCursor) {
    catalogItems(shopIds: $shopIds, tagIds: $tagIds, first: $first, after: $after) {
      edges {
        node {
          __typename
          ... on CatalogItemProduct {
            product {
              _id
              title
              slug
              description
              primaryImage {
                URLs {
                  original
                }
              }
              pricing {
                displayPrice
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`);

export const GET_TAGS = gql(`
  query GetTags {
    tags(shopId: "cmVhY3Rpb24vc2hvcDpGN2ZrM3plR3o4anpXaWZzQQ==") {
      nodes {
        _id
        name
        displayTitle
        slug
      }
    }
  }
`);

export const GET_PRODUCT_DETAILS = gql(`
  query GetProduct($shopId: ID!, $slugOrId: String!) {
    catalogItemProduct(shopId: $shopId, slugOrId: $slugOrId) {
      product {
        _id
        title
        description
        pricing {
          displayPrice
        }
        primaryImage {
          URLs {
            medium
            small
            original
          }
        }
        variants {
          _id
          title
          attributeLabel
          optionTitle
          pricing {
            displayPrice
            currency {
              code
            }
          }
        }
      }
    }
  }
`);
