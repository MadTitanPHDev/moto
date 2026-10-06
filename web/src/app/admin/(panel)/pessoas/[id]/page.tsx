import Link from "next/link";
import { notFound } from "next/navigation";
import { StageBadge } from "@/components/StageBadge";
import { getBike, getPerson, leadsForPerson, sourceLabel } from "@/lib/data";
import { formatDateTime } from "@/lib/format";

export default async function PersonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = getPerson(id);
  if (!person) notFound();
  const deals = leadsForPerson(person.id);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/pessoas" className="text-sm text-primary-600">
        ← Pessoas
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{person.name}</h1>
      <p className="text-sm text-gray-500">Origem: {sourceLabel[person.source]}</p>
      <div className="mt-6 space-y-2 rounded-2xl bg-white p-6 text-sm">
        <p>
          <strong>Telefone:</strong> {person.phone}
        </p>
        <p>
          <strong>E-mail:</strong> {person.email}
        </p>
      </div>
      <h2 className="mt-8 font-semibold">Interesses</h2>
      <ul className="mt-3 space-y-3">
        {deals.map((lead) => {
          const bike = getBike(lead.bikeId);
          return (
            <li key={lead.id}>
              <Link href={`/admin/leads/${lead.id}`} className="block rounded-2xl bg-white p-4 hover:outline hover:outline-ink">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{bike ? `${bike.brand} ${bike.model}` : lead.bikeId}</p>
                  <StageBadge status={lead.status} />
                </div>
                <p className="mt-2 text-sm text-gray-600">{lead.message}</p>
                <p className="mt-2 text-xs text-gray-500">{formatDateTime(lead.createdAt)}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
