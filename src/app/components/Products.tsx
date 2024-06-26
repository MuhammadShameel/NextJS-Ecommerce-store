// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import placeholderimg from "../../../public/images/elementor-placeholder-image.webp";
// import CardLoader from "../skeletonLoading/cardLoader";

// const Products = ({ productsData }: any) => {
//   const renderProductCards = () =>
//     productsData?.catalogItems?.edges?.map((edge: any) => {
//       const { product } = edge.node;
//       return (
//         <div
//           key={product._id}
//           className="product-card blur-bg relative flex flex-col overflow-hidden bg-white shadow hover:shadow-md transition"
//         >
//           <Link href={`/products/${product.slug}`}>
//             <Image
//               className="object-fill aspect-[5/4] sm:mx-auto"
//               src={product?.primaryImage?.URLs?.original || placeholderimg}
//               alt="product image"
//               width={300}
//               height={300}
//             />
//           </Link>
//           <div className="mt-4 px-3 pb-5">
//             <Link href={`/products/${product.slug}`}>
//               <h5 className="text-sm tracking-tight">{product.title}</h5>
//             </Link>
//             <div className="mt-2 flex justify-between">
//               <h5 className="text-sm ms-auto tracking-tight text-black">
//                 {product.pricing.displayPrice}
//               </h5>
//             </div>
//           </div>
//         </div>
//       );
//     });

//   if (!productsData) return <CardLoader />;

//   return (
//     <div className="container mx-auto font-open-sans">
//       <div className="product-section p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {renderProductCards()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
