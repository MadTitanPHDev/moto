import Link from "next/link";
import { StageBadge } from "@/components/StageBadge";
import { getBike, getPerson, leadStages, leads, leadStatusLabel } from "@/lib/data";

export default function FunnelPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Funil</h1>
      <p className="mt-1 text-sm text-gray-500">Do primeiro contato até a venda ou a perda.</p>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
        {leadStages.map((stage) => {
          const column = leads.filter((lead) => lead.status === stage);
          return (
            <section key={stage} className="w-72 shrink-0 rounded-2xl bg-white p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold">{leadStatusLabel[stage]}</h2>
                <span className="text-xs text-gray-500">{column.length}</span>
              </div>
              <ul className="space-y-2">
                {column.map((lead) => {
                  const person = getPerson(lead.personId);
                  const bike = getBike(lead.bikeId);
                  return (
                    <li key={lead.id}>
                      <Link href={`/admin/leads/${lead.id}`} className="block rounded-xl border border-gray-100 p-3 hover:border-ink">
                        <p className="font-medium">{person?.name}</p>
                        <p className="mt-1 text-sm text-gray-600">
                          {bike ? `${bike.brand} ${bike.model}` : lead.bikeId}
                        </p>
                        <div className="mt-2">
                          <StageBadge status={lead.status} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
