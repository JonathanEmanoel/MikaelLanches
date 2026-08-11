"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CheckoutForm, emptyCheckoutForm } from "@/types/checkout";
import { DELIVERY_FEE } from "@/constants/constants";
import { createWhatsAppOrderLink } from "@/services/order";
import { formatCurrency } from "@/utils/currency";

export default function CheckoutPageContent() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [checkout, setCheckout] = useState<CheckoutForm>(emptyCheckoutForm);
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = checkout.fulfillment === "Entrega" ? DELIVERY_FEE : 0;
  const total = totalPrice + deliveryFee;

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setCheckout((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    setSubmitting(true);
    const url = createWhatsAppOrderLink(items, checkout);
    window.open(url, "_blank");
    clearCart();
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-4xl overflow-hidden px-4 py-16 text-center sm:px-6">
        <div className="rounded-xl border border-amber-500/40 bg-zinc-950 p-6 sm:p-10">
          <h1 className="break-words text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
            Nenhum item no carrinho
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-400">
            Adicione produtos antes de finalizar o pedido.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-10 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-amber-500/40 bg-[linear-gradient(135deg,_#0d0d0d_0%,_#17100b_100%)] p-6 shadow-[0_0_36px_rgba(255,193,7,0.12)]"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Finalizar pedido</p>
            <h1 className="mt-2 break-words text-3xl font-black uppercase text-white">Informe seus dados</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Seu pedido sera enviado diretamente para o WhatsApp da Mikael.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Nome completo" value={checkout.name} onChange={(value) => handleChange("name", value)} required />
            <TextField label="WhatsApp / telefone" value={checkout.phone} onChange={(value) => handleChange("phone", value)} placeholder="(81) 9xxxx-xxxx" required />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(["Entrega", "Retirada"] as const).map((mode) => (
              <label key={mode} className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-black px-4 py-3 text-sm font-black text-white transition has-[:checked]:border-amber-500 has-[:checked]:text-amber-400">
                <input
                  type="radio"
                  name="fulfillment"
                  value={mode}
                  checked={checkout.fulfillment === mode}
                  onChange={() => handleChange("fulfillment", mode)}
                  className="h-4 w-4 accent-amber-500"
                />
                {mode}
              </label>
            ))}
          </div>

          {checkout.fulfillment === "Entrega" ? (
            <div className="grid gap-4">
              <TextField label="Endereco" value={checkout.address} onChange={(value) => handleChange("address", value)} required />
              <div className="grid gap-4 sm:grid-cols-3">
                <TextField label="Numero" value={checkout.number} onChange={(value) => handleChange("number", value)} required />
                <TextField label="Bairro" value={checkout.neighborhood} onChange={(value) => handleChange("neighborhood", value)} required />
                <TextField label="CEP" value={checkout.zipCode} onChange={(value) => handleChange("zipCode", value)} />
              </div>
              <TextField label="Complemento" value={checkout.complement} onChange={(value) => handleChange("complement", value)} />
              <TextField label="Ponto de referencia" value={checkout.reference} onChange={(value) => handleChange("reference", value)} />
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-bold text-zinc-200">
              Forma de pagamento
              <select
                value={checkout.payment}
                onChange={(event) => handleChange("payment", event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-amber-500"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartao">Cartao</option>
              </select>
            </label>
            <TextField label="Troco para" value={checkout.changeFor} onChange={(value) => handleChange("changeFor", value)} placeholder="Se precisar de troco" />
          </div>

          <label className="space-y-2 text-sm font-bold text-zinc-200">
            Observacao geral
            <textarea
              value={checkout.notes}
              onChange={(event) => handleChange("notes", event.target.value)}
              className="h-32 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-amber-500"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-4 text-sm font-black uppercase text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <MessageCircle className="h-5 w-5" />
            Finalizar pedido
          </button>
        </form>

        <aside className="space-y-5 rounded-xl border border-white/10 bg-zinc-950 p-6 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-500">Resumo do pedido</p>
            <p className="mt-2 text-lg font-black text-white">{items.length} itens no pedido</p>
          </div>
          <div className="divide-y divide-white/10">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-black uppercase text-white">{item.product.name}</p>
                  <p className="text-sm text-zinc-400">x{item.quantity}</p>
                </div>
                <p className="text-sm font-black text-amber-400">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <SummaryRow label="Subtotal" value={formatCurrency(totalPrice)} />
            <SummaryRow label="Entrega" value={formatCurrency(deliveryFee)} />
            <div className="border-t border-white/10 pt-3">
              <p className="text-sm text-zinc-300">Total</p>
              <p className="mt-1 text-3xl font-black text-amber-400">{formatCurrency(total)}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-2 text-sm font-bold text-zinc-200">
      {label}
      <input
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500"
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-zinc-300">{label}</span>
      <span className="font-black text-white">{value}</span>
    </div>
  );
}
