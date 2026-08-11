import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070707] px-4 py-16 text-center text-white sm:px-6">
      <div className="w-full max-w-4xl rounded-2xl border border-orange-500/40 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,122,0,0.22),_transparent_28%),linear-gradient(135deg,_#0d0d0d_0%,_#17100b_100%)] p-10 shadow-[0_0_36px_rgba(255,122,0,0.12)]">
        <div className="flex justify-center">
          <BrandLogo compact />
        </div>
        <p className="mt-8 text-sm font-black uppercase tracking-[0.3em] text-orange-500">Página não encontrada</p>
        <h1 className="mt-4 text-3xl font-black uppercase text-white">Ops, não encontramos esse pedido.</h1>
        <p className="mt-4 text-zinc-400">Verifique o link ou volte para a home para escolher um produto.</p>
        <Link
          href="/#cardapio"
          className="mt-8 inline-flex rounded-lg bg-orange-500 px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-orange-400"
        >
          Voltar para o cardápio
        </Link>
      </div>
    </main>
  );
}
