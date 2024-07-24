"use client";

import React from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useCart } from "@/app/context/CartContext";
import cartPlaceholder from "../../../public/images/catering-item-placeholder.png";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button className="text-black" onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={`${item.product._id}-${item.variant._id}`}
                className="flex items-center mb-4"
              >
                <Image
                  src={
                    item.product.primaryImage?.URLs?.original || cartPlaceholder
                  }
                  alt={item.product.title}
                  width={50}
                  height={50}
                  className="object-cover"
                />
                <div className="ml-4 flex-1">
                  <p>{item.variant.title}</p>
                  <p>{item.variant.pricing[0].displayPrice}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    removeFromCart(item.product._id, item.variant._id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
