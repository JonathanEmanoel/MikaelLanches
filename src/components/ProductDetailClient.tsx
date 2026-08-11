"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/currency";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAdditions, setSelectedAdditions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      (product.optionGroups ?? []).map((group) => [
        group.id,
        group.type === "multiple"
          ? group.options.filter((option) => option.default).map((option) => option.id)
          : [group.options.find((option) => option.default)?.id ?? group.options[0]?.id ?? ""]
      ])
    )
  );
  const [notes, setNotes] = useState("");

  const additions = useMemo(
    () => (product.additions ?? []).filter((addition) => selectedAdditions.includes(addition.id)),
    [product.additions, selectedAdditions]
  );

  const options = useMemo(
    () =>
      (product.optionGroups ?? []).flatMap((group) => {
        const selectedIds = selectedOptions[group.id] ?? [];
        return group.options
          .filter((option) => selectedIds.includes(option.id))
          .map((selected) => ({
            groupId: group.id,
            groupName: group.name,
            optionId: selected.id,
            optionName: selected.name,
            priceDelta: selected.priceDelta ?? 0
          }));
      }),
    [product.optionGroups, selectedOptions]
  );

  const unitPrice =
    product.price +
    additions.reduce((sum, addition) => sum + addition.price, 0) +
    options.reduce((sum, option) => sum + option.priceDelta, 0);

  const handleAdditionToggle = (additionId: string) => {
    setSelectedAdditions((current) =>
      current.includes(additionId)
        ? current.filter((id) => id !== additionId)
        : [...current, additionId]
    );
  };

  const handleOptionToggle = (groupId: string, optionId: string, isMultiple: boolean, maxSelections?: number) => {
    setSelectedOptions((current) => {
      if (!isMultiple) {
        return { ...current, [groupId]: [optionId] };
      }

      const currentValues = current[groupId] ?? [];
      if (currentValues.includes(optionId)) {
        return { ...current, [groupId]: currentValues.filter((id) => id !== optionId) };
      }

      if (maxSelections && currentValues.length >= maxSelections) {
        return current;
      }

      return { ...current, [groupId]: [...currentValues, optionId] };
    });
  };

  const handleAdd = () => {
    addItem(product, { quantity, additions, options, notes });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/#cardapio"
        className="mb-6 inline-flex items-center gap-2 text-sm font-black uppercase text-amber-400 transition hover:text-amber-300"
      >
        Voltar para o cardapio
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-xl border border-amber-500/30 bg-zinc-950">
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-[620px] min-h-[320px] w-full object-cover"
          />
        </div>

        <section className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Mikael Lanches</p>
            <h1 className="text-5xl font-black uppercase leading-none text-white sm:text-6xl">{product.name}</h1>
            <p className="text-base leading-7 text-zinc-300">{product.description}</p>
            <p className="text-4xl font-black text-amber-400">{formatCurrency(unitPrice)}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex h-14 items-center overflow-hidden rounded-full border border-white/15 bg-black">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="inline-flex h-full w-14 items-center justify-center text-white hover:text-amber-400"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="inline-flex h-full min-w-14 items-center justify-center text-lg font-black text-white">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((current) => current + 1)}
                className="inline-flex h-full w-14 items-center justify-center text-white hover:text-amber-400"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-amber-400 sm:flex-none"
            >
              <ShoppingBag className="h-5 w-5" />
              Adicionar ao pedido
            </button>
          </div>

          <div className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2">
            <Feature title="Feito na hora" text="Ingredientes frescos" />
            <Feature title="Sabor artesanal" text="Mais qualidade no pedido" />
          </div>
        </section>
      </div>

      {(product.additions?.length || product.optionGroups?.length) ? (
        <section className="mt-8 rounded-xl border border-white/10 bg-zinc-950/80 p-5 sm:p-6">
          <h2 className="text-xl font-black uppercase text-white">Personalize do seu jeito</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {product.additions?.length ? (
              <div className="rounded-lg border border-white/10 p-5">
                <h3 className="text-sm font-black uppercase text-zinc-200">Adicionais</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.additions.map((addition) => (
                    <label key={addition.id} className="flex items-center justify-between gap-3 text-sm text-zinc-200">
                      <span className="inline-flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAdditions.includes(addition.id)}
                          onChange={() => handleAdditionToggle(addition.id)}
                          className="h-4 w-4 accent-amber-500"
                        />
                        {addition.name}
                      </span>
                      <span className="font-black text-amber-400">+ {formatCurrency(addition.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {product.optionGroups?.map((group) => {
              const isMultiple = group.type === "multiple";
              const selectedCount = selectedOptions[group.id]?.length ?? 0;

              return (
              <div key={group.id} className="rounded-lg border border-white/10 p-5">
                <h3 className="text-sm font-black uppercase text-zinc-200">{group.name}</h3>
                {isMultiple && group.maxSelections ? (
                  <p className="mt-2 text-xs text-zinc-500">
                    {selectedCount}/{group.maxSelections} selecionados
                  </p>
                ) : null}
                <div className="mt-4 grid gap-3">
                  {group.options.map((option) => (
                    <label key={option.id} className="flex items-center justify-between gap-3 text-sm text-zinc-200">
                      <span className="inline-flex items-center gap-3">
                        <input
                          type={isMultiple ? "checkbox" : "radio"}
                          name={group.id}
                          checked={(selectedOptions[group.id] ?? []).includes(option.id)}
                          onChange={() => handleOptionToggle(group.id, option.id, isMultiple, group.maxSelections)}
                          className="h-4 w-4 accent-amber-500"
                        />
                        {option.name}
                      </span>
                      {option.priceDelta ? (
                        <span className="font-black text-amber-400">+ {formatCurrency(option.priceDelta)}</span>
                      ) : (
                        <span className="rounded-full border border-amber-500/40 px-3 py-1 text-xs text-amber-400">Padrao</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-5 rounded-xl border border-white/10 bg-zinc-950/80 p-5 sm:p-6">
        <label className="text-sm font-black uppercase text-zinc-200">
          Observacoes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Ex.: sem milho, molho a parte, ponto da carne."
            className="mt-3 h-24 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-normal text-white outline-none placeholder:text-zinc-600 focus:border-amber-500"
          />
        </label>
      </section>

      <div className="mt-6 flex justify-end">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 rounded-lg border border-amber-500/60 bg-black px-5 py-3 text-sm font-black uppercase text-white transition hover:bg-amber-500 hover:text-black"
        >
          <ShoppingCart className="h-5 w-5" />
          Ver carrinho
        </Link>
      </div>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="font-black text-amber-400">{title}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-300">{text}</p>
    </div>
  );
}
