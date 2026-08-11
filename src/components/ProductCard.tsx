"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/currency";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const needsDetails = Boolean(product.additions?.length || product.optionGroups?.length);

  return (
    <article className="overflow-hidden rounded-xl border border-amber-500/25 bg-[linear-gradient(180deg,_#20140f_0%,_#101010_45%,_#0a0a0a_100%)] shadow-[0_16px_40px_rgba(0,0,0,0.38)]">
      <Link href={`/product/${product.id}`} className="block h-52 overflow-hidden bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase text-white">{product.name}</h3>
          <p className="min-h-12 text-sm leading-6 text-zinc-400">{product.description}</p>
        </div>

        <div>
          <span className="text-2xl font-black text-amber-400">{formatCurrency(product.price)}</span>
        </div>

        {needsDetails ? (
          <Link
            href={`/product/${product.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber-500 px-4 py-3 text-sm font-black uppercase text-black transition hover:bg-amber-400"
          >
            <ShoppingCart className="h-4 w-4" />
            Visualizar
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber-500 px-4 py-3 text-sm font-black uppercase text-black transition hover:bg-amber-400"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </button>
        )}
      </div>
    </article>
  );
}
