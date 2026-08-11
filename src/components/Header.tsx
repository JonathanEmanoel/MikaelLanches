"use client";

import Link from "next/link";
import { Menu, MessageCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import BrandLogo from "@/components/BrandLogo";
import { WHATSAPP_NUMBER } from "@/constants/constants";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Cardapio", href: "/#cardapio" },
  { label: "Sanduiches", href: "/category/sanduiches" },
  { label: "Espetinhos", href: "/category/espetinhos" },
  { label: "Acai", href: "/category/acai" },
  { label: "Contato", href: "/#contato" }
];

export default function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const hideCartUI = pathname === "/cart";

  return (
    <header className="sticky top-0 z-30 border-b border-amber-500/20 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-black uppercase text-white transition hover:text-amber-400 ${
                index === 0 ? "text-amber-400 after:absolute after:-bottom-3 after:left-0 after:h-0.5 after:w-full after:bg-amber-500" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {!hideCartUI && (
            <>
              <Link
                href="/cart"
                aria-label="Ver carrinho"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:border-amber-500 hover:text-amber-400 sm:h-12 sm:w-12"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-black text-black">
                  {totalItems}
                </span>
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="hidden items-center gap-2 rounded-lg border border-amber-500 bg-black px-5 py-3 text-sm font-black uppercase text-amber-400 transition hover:bg-amber-500 hover:text-black sm:inline-flex"
              >
                <MessageCircle className="h-4 w-4" />
                Pedir no WhatsApp
              </a>
            </>
          )}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-black uppercase text-white transition hover:bg-amber-500 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            {!hideCartUI && (
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-amber-500 px-3 py-3 text-sm font-black uppercase text-black transition hover:bg-amber-400"
              >
                Carrinho ({totalItems})
              </Link>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
