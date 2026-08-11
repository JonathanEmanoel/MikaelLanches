"use client";

import React from "react";
import CartBar from "./CartBar";
import { useCart } from "@/hooks/useCart";
import { useRouter, usePathname } from "next/navigation";

export default function CartBarContainer() {
  const { items, totalPrice } = useCart();
  const count = items.reduce((s, it) => s + it.quantity, 0);
  const router = useRouter();
  const pathname = usePathname();
  const hideCartUI = pathname === "/cart" || pathname === "/checkout";

  if (count === 0) return null;
  if (hideCartUI) return null;

  return (
    <CartBar
      count={count}
      total={totalPrice}
      onClick={() => router.push('/cart')}
    />
  );
}
