import Link from "next/link";
import { getBike, leadStatusLabel, leads } from "@/lib/data";

export default function LeadsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Exportar Excel</button>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-gray-100 text-gray-500">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Moto</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const bike = getBike(lead.bikeId);
              return (
                <tr key={lead.id} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {lead.name}
                    <div className="text-xs text-gray-500">{lead.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    {bike ? `${bike.brand} ${bike.model}` : lead.bikeId}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.phone}
                    <div className="text-xs">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3">{leadStatusLabel[lead.status]}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="text-primary-600">
                      Detalhe
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
