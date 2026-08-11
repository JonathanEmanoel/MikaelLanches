"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/currency";

export default function CartPageContent() {
  const { items, totalItems, totalPrice, updateItemQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-xl border border-amber-500/40 bg-[linear-gradient(135deg,_#0d0d0d_0%,_#1a1009_100%)] p-10 shadow-[0_0_36px_rgba(255,193,7,0.12)]">
          <ShoppingBag className="mx-auto h-14 w-14 text-amber-500" />
          <h1 className="mt-5 text-3xl font-black uppercase text-white">Seu pedido esta vazio</h1>
          <p className="mt-4 text-zinc-400">Adicione um lanche, espetinho ou bebida e volte aqui para finalizar.</p>
          <Link
            href="/#cardapio"
            className="mt-8 inline-flex rounded-lg bg-amber-500 px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-amber-400"
          >
            Ir para o cardapio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Carrinho</p>
          <h1 className="mt-2 text-3xl font-black uppercase text-white">Itens no pedido</h1>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-white/10 bg-zinc-950/90 p-5 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
              <div className="grid gap-4 md:grid-cols-[96px_1fr_auto] md:items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-xl font-black uppercase text-white">{item.product.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.product.description}</p>
                  {(item.options.length || item.additions.length || item.notes) ? (
                    <div className="mt-3 space-y-1 text-xs leading-5 text-zinc-400">
                      {item.options.map((option) => (
                        <p key={`${item.id}-${option.groupId}`}>{option.groupName}: {option.optionName}</p>
                      ))}
                      {item.additions.length ? <p>Adicionais: {item.additions.map((addition) => addition.name).join(", ")}</p> : null}
                      {item.notes ? <p>Obs.: {item.notes}</p> : null}
                    </div>
                  ) : null}
                  <p className="mt-2 text-sm font-black text-amber-400">{formatCurrency(item.unitPrice * item.quantity)}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    aria-label="Diminuir quantidade"
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:border-amber-500 hover:text-amber-400"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="inline-flex h-10 min-w-[3rem] items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-sm font-black text-amber-400">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar quantidade"
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:border-amber-500 hover:text-amber-400"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-black text-red-200 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-amber-500/40 bg-zinc-950 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total de itens</p>
              <p className="mt-1 text-2xl font-black text-white">
                {totalItems} {totalItems === 1 ? "produto" : "produtos"}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-zinc-400">Subtotal</p>
              <p className="mt-1 text-3xl font-black text-amber-400">{formatCurrency(totalPrice)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/40 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,193,7,0.2),_transparent_28%),linear-gradient(135deg,_#0d0d0d_0%,_#17100b_100%)] p-6 shadow-[0_0_36px_rgba(255,193,7,0.12)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Proximo passo</p>
              <h2 className="mt-2 text-2xl font-black uppercase text-white">Confirme seus dados</h2>
            </div>
            <Link
              href="/checkout"
              className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-amber-400"
            >
              Ir para o Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
