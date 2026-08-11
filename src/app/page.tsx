import Header from "@/components/Header";
import BrandLogo from "@/components/BrandLogo";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import type { ComponentType, ReactNode } from "react";
import { categories, products } from "@/data";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/constants/constants";
import {
  Clock3,
  Crown,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  Star
} from "lucide-react";

const featuredProducts = products.filter((product) => product.featured);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden border-b border-amber-500/20 bg-black">
          <img
            src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=85"
            alt="X-Tudo artesanal da Mikael"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,_rgba(0,0,0,0.96)_0%,_rgba(0,0,0,0.78)_45%,_rgba(0,0,0,0.25)_100%)]" />
          <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="space-y-7">
              <img
                src="/images/mikael/logo.png"
                alt="Mikael Lanches e Espetinhos"
                className="h-28 w-28 rounded-full object-cover ring-2 ring-amber-500 sm:h-36 sm:w-36"
              />
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.28em] text-amber-400">
                  <Crown className="h-5 w-5" />
                  Desde 2017
                </p>
                <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase leading-none text-white sm:text-6xl">
                  Sabor, qualidade e bons momentos!
                </h1>
              </div>
              <p className="max-w-xl text-lg leading-8 text-zinc-200">
                Lanches artesanais, espetinhos no ponto, bebidas geladas e aquele atendimento feito para compartilhar bons momentos.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#cardapio"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-4 text-sm font-black uppercase text-black shadow-[0_0_28px_rgba(255,193,7,0.28)] transition hover:bg-amber-400"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Ver cardapio
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-500/60 bg-black/60 px-6 py-4 text-sm font-black uppercase text-white transition hover:bg-amber-500 hover:text-black"
                >
                  <MessageCircle className="h-5 w-5" />
                  Pedir no WhatsApp
                </a>
              </div>
            </div>
            <div className="hidden lg:block" />
          </div>
        </section>

        <section id="cardapio" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Cardapio" title="Escolha sua categoria" />
          <div className="no-scrollbar mt-7 flex gap-3 overflow-x-auto pb-2">
            <a href="#destaques" className="shrink-0 rounded-full border border-amber-500/50 px-4 py-2 text-sm font-black uppercase text-amber-400">
              Destaques
            </a>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.id}`}
                className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-sm font-black uppercase text-white transition hover:border-amber-500 hover:text-amber-400"
              >
                {category.name}
              </a>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <section id="destaques" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Destaques" title="Os queridinhos da Mikael" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 border-y border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sparkles, title: "Qualidade", text: "Ingredientes selecionados e preparo artesanal." },
              { icon: MessageCircle, title: "Atendimento", text: "Pedido simples e atendimento pelo WhatsApp." },
              { icon: Crown, title: "Tradicao", text: "Desde 2017 levando sabor para voce." },
              { icon: Star, title: "Bons momentos", text: "Cada refeicao vira uma memoria boa." }
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <item.icon className="h-10 w-10 shrink-0 text-amber-500" />
                <div>
                  <h3 className="text-sm font-black uppercase text-amber-400">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="contato" className="border-t border-amber-500/30 bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_1fr_1fr_1fr] lg:px-8">
          <BrandLogo compact />
          <FooterBlock icon={MapPin} title="Endereco">
            Rua Arapongas, 20 - Timbi.
            <br />
            Na rua da bilheteria do metro da estacao Camaragibe.
          </FooterBlock>
          <FooterBlock icon={MessageCircle} title="Contato">
            {WHATSAPP_DISPLAY}
            <br />
            @mikael_lanches01
          </FooterBlock>
          <FooterBlock icon={Clock3} title="Horario">
            Segunda a Domingo
            <br />
            17h00 as 23h30
          </FooterBlock>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
          (c) 2026 Mikael Lanches e Espetinhos. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-500">{eyebrow}</p>
      <div className="mt-2 flex items-center justify-center gap-5">
        <span className="h-px w-12 bg-amber-500" />
        <h2 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">{title}</h2>
        <span className="h-px w-12 bg-amber-500" />
      </div>
    </div>
  );
}

function FooterBlock({
  icon: Icon,
  title,
  children
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="inline-flex items-center gap-2 text-sm font-black uppercase text-amber-400">
        <Icon className="h-5 w-5" />
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-300">{children}</p>
    </div>
  );
}
