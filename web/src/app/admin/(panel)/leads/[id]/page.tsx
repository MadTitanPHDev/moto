import Link from "next/link";
import { notFound } from "next/navigation";
import { getBike, getLead, leadStatusLabel } from "@/lib/data";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = getLead(id);
  if (!lead) notFound();
  const bike = getBike(lead.bikeId);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/leads" className="text-sm text-primary-600">
        ← Interessados
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{lead.name}</h1>
      <p className="text-gray-500">{leadStatusLabel[lead.status]}</p>
      <div className="mt-6 space-y-3 rounded-2xl bg-white p-6 text-sm">
        <p>
          <strong>Telefone:</strong> {lead.phone}
        </p>
        <p>
          <strong>E-mail:</strong> {lead.email}
        </p>
        <p>
          <strong>Moto:</strong>{" "}
          {bike ? (
            <Link className="text-primary-600" href={`/motos/${bike.slug}`}>
              {bike.brand} {bike.model}
            </Link>
          ) : (
            lead.bikeId
          )}
        </p>
        <p>
          <strong>Mensagem:</strong> {lead.message}
        </p>
        <label className="block pt-2">
          Alterar status
          <select className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3" defaultValue={lead.status}>
            <option value="novo">Novo</option>
            <option value="contactado">Contactado</option>
            <option value="negociacao">Em negociação</option>
            <option value="fechado">Fechado</option>
            <option value="perdido">Perdido</option>
          </select>
        </label>
        <button type="button" className="h-11 rounded-lg bg-primary-600 px-4 font-semibold text-white">
          Salvar status (demo)
        </button>
      </div>
    </div>
  );
}
