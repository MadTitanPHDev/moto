import Link from "next/link";
import { company } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="font-bold text-gray-900">{company.name}</p>
          <p className="mt-2 text-sm text-gray-500">{company.tagline}</p>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-900">Loja</p>
          <p className="mt-2">{company.address}</p>
          <p>{company.hours}</p>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-900">Contato</p>
          <p className="mt-2">{company.phone}</p>
          <p>{company.whatsappDisplay}</p>
          <p>{company.instagram}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link className="text-gray-600 hover:text-primary-600" href="/catalogo">
            Catálogo
          </Link>
          <Link className="text-gray-600 hover:text-primary-600" href="/sobre">
            Sobre
          </Link>
          <Link className="text-gray-600 hover:text-primary-600" href="/contato">
            Contato
          </Link>
          <Link className="text-gray-600 hover:text-primary-600" href="/admin/login">
            Área da loja
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-500">
        © 2026 {company.name} · Protótipo de apresentação · Motos
      </div>
    </footer>
  );
}
