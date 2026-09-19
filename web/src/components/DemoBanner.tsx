import Link from "next/link";

export function DemoBanner() {
  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <p className="text-white/80">
          Protótipo visual para apresentação ao cliente · dados de demonstração · motos
        </p>
        <nav className="flex flex-wrap gap-3 font-medium">
          <Link className="hover:text-primary-100" href="/">
            Site
          </Link>
          <Link className="hover:text-primary-100" href="/catalogo">
            Catálogo
          </Link>
          <Link className="hover:text-primary-100" href="/admin/login">
            Painel admin
          </Link>
          <Link className="hover:text-primary-100" href="/mapa">
            Todas as telas
          </Link>
        </nav>
      </div>
    </div>
  );
}
