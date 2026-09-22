import Link from "next/link";
import { DemoBanner } from "@/components/DemoBanner";
import { company } from "@/lib/data";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner />
      <div className="mx-auto flex max-w-md flex-col px-4 py-20">
        <p className="text-3xl font-extrabold tracking-tight">apexmotos</p>
        <p className="mt-2 text-sm text-gray-500">Área da loja · {company.name}</p>
        <p className="mt-2 text-sm text-gray-500">Acesso de demonstração — qualquer dado entra no painel.</p>
        <form className="mt-8 space-y-3">
          <input className="h-12 w-full rounded-full border border-gray-300 px-5" defaultValue="admin@apexmotos.com.br" readOnly />
          <input className="h-12 w-full rounded-full border border-gray-300 px-5" type="password" defaultValue="demo" readOnly />
          <Link
            href="/admin"
            className="flex h-12 w-full items-center justify-center rounded-full bg-ink font-extrabold uppercase tracking-[0.14em] text-white"
          >
            Entrar
          </Link>
        </form>
        <Link href="/" className="mt-6 block text-center text-sm underline underline-offset-4">
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}
