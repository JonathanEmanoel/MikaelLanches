import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <img
        src="/images/mikael/logo.png"
        alt="Mikael Lanches e Espetinhos"
        className={`${compact ? "h-20 w-20" : "h-16 w-16"} rounded-full object-cover ring-2 ring-amber-500 shadow-[0_0_24px_rgba(255,193,7,0.28)]`}
      />
      {!compact ? (
        <span className="hidden text-xl font-black uppercase leading-none text-amber-400 sm:block">
          Mikael<br />
          <span className="text-white">Lanches</span>
        </span>
      ) : null}
    </Link>
  );
}
