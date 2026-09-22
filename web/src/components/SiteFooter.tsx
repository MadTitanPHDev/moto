import Link from "next/link";
import { company } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="text-2xl font-extrabold tracking-tight">apexmotos</p>
          <p className="mt-3 text-sm text-gray-500">{company.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-extrabold uppercase tracking-[0.14em]">Ajuda</p>
          <div className="mt-3 flex flex-col gap-2 text-gray-600">
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/contato">Visita e atendimento</Link>
            <Link href="/sobre">Ficha técnica</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-extrabold uppercase tracking-[0.14em]">Contato</p>
          <div className="mt-3 space-y-1 text-gray-600">
            <p>{company.phone}</p>
            <p>{company.whatsappDisplay}</p>
            <p>{company.address}</p>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-extrabold uppercase tracking-[0.14em]">Explorar</p>
          <div className="mt-3 flex flex-col gap-2 text-gray-600">
            <Link href="/sobre">Quem somos</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/admin/login">Área da loja</Link>
            <p>{company.instagram}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-500">
        © 2026 apexmotos · {company.city}/{company.state} · Protótipo de apresentação
      </div>
    </footer>
  );
}
