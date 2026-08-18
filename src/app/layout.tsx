import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartBarContainer from "@/components/CartBarContainer";
import SuspendedSite from "@/components/SuspendedSite";
import { SITE_SUSPENDED } from "@/config/site";

export const metadata: Metadata = {
  title: "Mikael Lanches e Espetinhos",
  description: SITE_SUSPENDED
    ? "Site temporariamente indisponível."
    : "Cardapio digital e pedidos via WhatsApp para a Mikael Lanches e Espetinhos"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (SITE_SUSPENDED) {
    return (
      <html lang="pt-BR">
        <body>
          <SuspendedSite />
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
          <CartBarContainer />
        </CartProvider>
      </body>
    </html>
  );
}
