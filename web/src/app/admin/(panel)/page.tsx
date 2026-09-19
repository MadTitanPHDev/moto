import Link from "next/link";
import { bikes, leads } from "@/lib/data";
import { formatNumber } from "@/lib/format";

export default function AdminDashboardPage() {
  const active = bikes.filter((bike) => bike.status === "active").length;
  const views = bikes.reduce((sum, bike) => sum + bike.views, 0);
  const sold = bikes.filter((bike) => bike.status === "sold").length;
  const top = [...bikes].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/admin/motos/nova"
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
        >
          + Adicionar moto
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Motos ativas", String(active)],
          ["Visualizações", formatNumber(views)],
          ["Leads", String(leads.length)],
          ["Vendas", String(sold)],
          ["Taxa", "5,2%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-5">
          <h2 className="font-semibold">Leads por período</h2>
          <div className="mt-6 flex h-40 items-end gap-3">
            {[40, 55, 35, 70, 48, 90, 62].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary-500" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Últimos 7 dias (dados de demonstração)</p>
        </section>
        <section className="rounded-2xl bg-white p-5">
          <h2 className="font-semibold">Motos mais vistas</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {top.map((bike) => (
              <li key={bike.id} className="flex justify-between border-b border-gray-50 pb-2">
                <span>
                  {bike.brand} {bike.model}
                </span>
                <span className="text-gray-500">{bike.views} views</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
