import Link from "next/link";

export function DemoBanner() {
  return (
    <div className="bg-cream text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5">
        <Link href="/catalogo">Novo estoque | Conheça a coleção</Link>
        <span className="hidden text-ink/30 sm:inline">·</span>
        <nav className="hidden flex-wrap gap-3 font-bold normal-case tracking-normal sm:flex">
          <Link className="hover:underline" href="/">
            Site
          </Link>
          <Link className="hover:underline" href="/admin/login">
            Painel
          </Link>
          <Link className="hover:underline" href="/mapa">
            Telas
          </Link>
        </nav>
      </div>
    </div>
  );
}
