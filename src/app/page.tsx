import Nav from "./components/Nav";
import Product from "./components/Product";
import Footer from "./components/Footer";
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      <Nav />
      <Product />
      <Footer />
    </div>
  );
}
