"use client";

import Nav from "./components/Nav";
import Product from "./components/Products";
import Footer from "./components/Footer";
import "../app/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apolloClient";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Product />
      <Footer />
    </ApolloProvider>
  );
}
