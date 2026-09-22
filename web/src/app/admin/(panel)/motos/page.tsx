import Image from "next/image";
import Link from "next/link";
import { bikeStatusLabel, bikes } from "@/lib/data";
import { formatCurrency } from "@/lib/format";

export default function AdminBikesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Motos</h1>
        <Link
          href="/admin/motos/nova"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
        >
          + Nova moto
        </Link>
      </div>
      <div className="space-y-3">
        {bikes.map((bike) => (
          <article key={bike.id} className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4">
            <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-gray-100">
              <Image src={bike.images[0]} alt="" fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {bike.brand} {bike.model} {bike.year} · {formatCurrency(bike.price)}
              </p>
              <p className="text-sm text-gray-500">
                👁️ {bike.views} · ♥️ {bike.favorites} · 💬 {bike.leads} interessados · {bikeStatusLabel[bike.status]}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {bike.status === "active" && (
                <Link href={`/motos/${bike.slug}`} className="rounded-lg border border-gray-300 px-3 py-1">
                  Ver
                </Link>
              )}
              <Link href={`/admin/motos/${bike.id}/editar`} className="rounded-lg border border-gray-300 px-3 py-1">
                Editar
              </Link>
              <button className="rounded-lg border border-gray-300 px-3 py-1">Pausar</button>
              <button className="rounded-lg bg-success px-3 py-1 text-white">Vendida</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
