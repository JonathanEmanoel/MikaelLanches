export default function SuspendedSite() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070707] px-4 py-10 text-white">
      <section className="w-full max-w-xl text-center">
        <img
          src="/images/mikael/logo.png"
          alt="Mikael Lanches e Espetinhos"
          className="mx-auto h-36 w-36 rounded-full object-cover ring-2 ring-amber-500 shadow-[0_0_36px_rgba(245,158,11,0.3)] sm:h-44 sm:w-44"
        />
        <div className="mt-8 rounded-xl border border-amber-500/35 bg-black/70 px-5 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.45)] sm:px-8 sm:py-10">
          <h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Site temporariamente indisponível
          </h1>
        </div>
      </section>
    </main>
  );
}
