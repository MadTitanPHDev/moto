import Link from "next/link";
import { ExportCsvButton } from "@/components/ExportCsvButton";
import { StageBadge } from "@/components/StageBadge";
import { getBike, getPerson, getStaff, leads } from "@/lib/data";
import { formatDateTime } from "@/lib/format";

export default function LeadsPage() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Interesses</h1>
          <p className="text-sm text-gray-500">Cada linha é um negócio ligado a uma pessoa e a uma moto.</p>
        </div>
        <ExportCsvButton />
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-3">Pessoa</th>
              <th className="px-4 py-3">Moto</th>
              <th className="px-4 py-3">Estágio</th>
              <th className="px-4 py-3">Responsável</th>
              <th className="px-4 py-3">Entrada</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const person = getPerson(lead.personId);
              const bike = getBike(lead.bikeId);
              const owner = getStaff(lead.ownerId);
              return (
                <tr key={lead.id} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {person?.name}
                    <div className="text-xs text-gray-500">{person?.phone}</div>
                  </td>
                  <td className="px-4 py-3">{bike ? `${bike.brand} ${bike.model}` : lead.bikeId}</td>
                  <td className="px-4 py-3">
                    <StageBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{owner?.name}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDateTime(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="text-primary-600">
                      Ficha
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
