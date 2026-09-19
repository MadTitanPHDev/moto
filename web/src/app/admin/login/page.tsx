import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { company } from "@/lib/data";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DemoBanner />
      <div className="mx-auto flex max-w-md flex-col px-4 py-16">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm text-gray-500">Área da loja</p>
          <h1 className="mt-1 text-2xl font-bold">{company.name}</h1>
          <p className="mt-2 text-sm text-gray-500">Login de demonstração — qualquer dado entra no painel.</p>
          <form className="mt-6 space-y-3">
            <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue="admin@apexmotos.com.br" readOnly />
            <input className="h-11 w-full rounded-lg border border-gray-300 px-3" type="password" defaultValue="demo" readOnly />
            <Link
              href="/admin"
              className="flex h-11 w-full items-center justify-center rounded-lg bg-primary-600 font-semibold text-white"
            >
              Entrar
            </Link>
          </form>
          <Link href="/" className="mt-4 block text-center text-sm text-primary-600">
            Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  );
}
