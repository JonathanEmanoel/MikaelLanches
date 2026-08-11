import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartBarContainer from "@/components/CartBarContainer";

export const metadata: Metadata = {
  title: "Mikael Lanches e Espetinhos",
  description:
    "Cardapio digital e pedidos via WhatsApp para a Mikael Lanches e Espetinhos"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
