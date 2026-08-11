"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";
import type { CartItem, SelectedAddition, SelectedOption } from "@/types/cart";

type AddItemConfig = {
  quantity?: number;
  additions?: SelectedAddition[];
  options?: SelectedOption[];
  notes?: string;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, config?: AddItemConfig) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const addItem = (product: Product, config: AddItemConfig = {}) => {
    const quantity = config.quantity ?? 1;
    const additions = config.additions ?? [];
    const options = config.options ?? [];
    const notes = config.notes?.trim() || undefined;
    const unitPrice =
      product.price +
      additions.reduce((sum, addition) => sum + addition.price, 0) +
      options.reduce((sum, option) => sum + option.priceDelta, 0);
    const itemId = [
      product.id,
      additions.map((addition) => addition.id).sort().join("."),
      options.map((option) => `${option.groupId}:${option.optionId}`).sort().join("."),
      notes ?? ""
    ].join("|");

    setItems((current) => {
      const existing = current.find((item) => item.id === itemId);
      if (existing) {
        return current.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { id: itemId, product, quantity, unitPrice, additions, options, notes }];
    });
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setItems((current) => current.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({ items, totalItems, totalPrice, addItem, updateItemQuantity, removeItem, clearCart }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider.");
  }

  return context;
}
