import Link from "next/link";

export function TopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-primary-100 bg-[#fbf8f3]/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        <p className="text-sm text-gray-600">Planejamento e proposta de permuta · leitura em páginas</p>
        <Link
          href="http://localhost:3000"
          className="hidden rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700 sm:inline-flex"
        >
          Ver protótipo da loja
        </Link>
      </div>
    </div>
  );
}
