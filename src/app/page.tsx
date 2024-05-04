"use client";

import Nav from "./components/Nav";
import Product from "./components/Products";
import Footer from "./components/Footer";
import "../app/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";

interface Location {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Nav />
        <Product />
        <Footer />
      </div>
      //{" "}
    </ApolloProvider>
  );
}
