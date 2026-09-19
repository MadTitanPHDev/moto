import Link from "next/link";
import { notFound } from "next/navigation";
import { getBike } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export default async function EditarMotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bike = getBike(id);
  if (!bike) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/motos" className="text-sm text-primary-600">
        ← Motos
      </Link>
      <h1 className="mt-2 text-2xl font-bold">
        Editar {bike.brand} {bike.model}
      </h1>
      <form className="mt-6 space-y-3 rounded-2xl bg-white p-6">
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={`${bike.brand} ${bike.model}`} />
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={String(bike.price)} />
        <input className="h-11 w-full rounded-lg border border-gray-300 px-3" defaultValue={String(bike.mileage)} />
        <textarea className="h-28 w-full rounded-lg border border-gray-300 px-3 py-2" defaultValue={bike.description} />
        <p className="text-sm text-gray-500">Preço atual: {formatCurrency(bike.price)}</p>
        <div className="flex gap-2">
          <button type="button" className="h-11 rounded-lg bg-primary-600 px-4 font-semibold text-white">
            Salvar (demo)
          </button>
          <button type="button" className="h-11 rounded-lg bg-success px-4 font-semibold text-white">
            Marcar vendida
          </button>
        </div>
      </form>
    </div>
  );
}
