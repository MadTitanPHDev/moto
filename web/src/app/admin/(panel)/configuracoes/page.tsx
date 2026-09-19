import { company } from "@/lib/data";

export default function ConfiguracoesPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <form className="mt-6 space-y-3 rounded-2xl bg-white p-6">
        <h2 className="font-semibold">Dados da empresa</h2>
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={company.name} />
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={company.address} />
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={company.phone} />
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={company.whatsappDisplay} />
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={company.instagram} />
        <div className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-500">
          Upload do logotipo
        </div>
        <h2 className="pt-4 font-semibold">Acesso</h2>
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" type="password" placeholder="Nova senha" />
        <button type="button" className="h-11 rounded-lg bg-primary-600 px-4 font-semibold text-white">
          Salvar (demo)
        </button>
      </form>
    </div>
  );
}
