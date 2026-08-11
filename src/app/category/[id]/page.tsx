import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((item) => item.id === params.id);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((product) => product.categoryId === category.id);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Header />
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-xl border border-amber-500/50 bg-[radial-gradient(circle_at_75%_30%,_rgba(255,193,7,0.24),_transparent_32%),linear-gradient(135deg,_#0b0b0b_0%,_#1a1009_100%)]">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_0.82fr] md:items-center lg:p-10">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Cardapio Mikael</p>
              <h1 className="mt-3 break-words text-3xl font-black uppercase leading-tight text-white min-[380px]:text-4xl sm:text-5xl">{category.name}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">{category.tagline}</p>
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
              <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-500">Produtos</p>
              <h2 className="mt-2 break-words text-2xl font-black uppercase text-white">Escolha seu favorito</h2>
            </div>
            <span className="shrink-0 rounded-full border border-amber-500/50 px-4 py-2 text-sm font-black text-amber-400">
              {categoryProducts.length} itens
            </span>
          </div>
          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
