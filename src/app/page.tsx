"use client";

import Nav from "./components/Nav";
import Product from "./components/Products";
import Footer from "./components/Footer";
import "../app/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";
// import { useQuery, gql } from "@apollo/client";

// const GET_LOCATIONS = gql`
//   query GetLocations {
//     locations {
//       id
//       name
//       description
//       photo
//     }
//   }
// `;
interface Location {
  id: number;
  name: string;
  description: string;
  photo: string;
}

// function DisplayLocations() {
//   const { loading, error, data } = useQuery(GET_LOCATIONS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;

//   return data.locations.map(({ id, name, description, photo }: Location) => (
//     <div key={id}>
//       <h3>{name}</h3>
//       <img width="400" height="250" alt="location-reference" src={`${photo}`} />
//       <br />
//       <b>About this location:</b>
//       <p>{description}</p>
//       <br />
//     </div>
//   ));
// }
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Nav />
        {/* <DisplayLocations /> */}
        <Product />
        <Footer />
      </div>
      //{" "}
    </ApolloProvider>
  );
}
