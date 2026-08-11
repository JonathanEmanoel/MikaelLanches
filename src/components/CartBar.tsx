"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

type Props = {
  count: number;
  total: number;
  onClick: () => void;
};

export default function CartBar({ count, total, onClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="dialog"
      aria-live="polite"
      className={`fixed inset-x-3 bottom-4 z-50 transform-gpu transition-transform transition-opacity duration-300 sm:inset-x-6 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-md border border-amber-500/40 bg-black px-4 py-3 shadow-[0_0_30px_rgba(255,193,7,0.18)]">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber-500/10 text-amber-400">
                  <ShoppingCart className="h-5 w-5" />
                </span>
                <div className="text-sm">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-400">Carrinho</div>
                  <div className="mt-0.5 text-base font-black text-white">{count} {count === 1 ? 'item' : 'itens'}</div>
                </div>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="text-right text-sm text-zinc-400">Total</div>
                <div className="text-lg font-black text-amber-400">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <button
                onClick={onClick}
                className="mx-auto block w-full rounded-md bg-amber-500 px-4 py-2 text-sm font-black uppercase text-black transition hover:bg-amber-400 sm:w-auto"
              >
                Ver carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
