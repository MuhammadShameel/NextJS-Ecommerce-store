// src/app/context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Variant } from "@/app/types";

interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variant: Variant, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product._id === product._id && item.variant._id === variant._id
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { product, variant, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          item.product._id !== productId || item.variant._id !== variantId
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
