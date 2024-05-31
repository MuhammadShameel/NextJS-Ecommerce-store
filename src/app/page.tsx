"use client";

import Product from "./components/Products";
import "../app/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/client";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Product />
      </div>
    </ApolloProvider>
  );
}
