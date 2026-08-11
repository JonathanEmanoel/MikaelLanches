import Link from "next/link";
import type { Category } from "@/types/product";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.id}`}
      className="group overflow-hidden rounded-xl border border-orange-500/50 bg-zinc-950 shadow-[0_16px_36px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-orange-400"
    >
      <div className="h-40 overflow-hidden bg-zinc-900">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="border-t border-white/10 p-4 text-center">
        <h3 className="text-base font-black uppercase text-white">{category.name}</h3>
      </div>
    </Link>
  );
}
