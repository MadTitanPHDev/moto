import Link from "next/link";
import { notFound } from "next/navigation";
import { StageBadge } from "@/components/StageBadge";
import {
  activitiesForLead,
  activityLabel,
  getBike,
  getLead,
  getPerson,
  getStaff,
  lostReasonLabel,
  tasksForLead,
} from "@/lib/data";
import { formatCurrency, formatDateTime, taskTiming, whatsappHref } from "@/lib/format";

const timingLabel = {
  atrasada: "Atrasada",
  hoje: "Hoje",
  em_dia: "Em dia",
  concluida: "Concluída",
};

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = getLead(id);
  if (!lead) notFound();
  const person = getPerson(lead.personId);
  const bike = getBike(lead.bikeId);
  const owner = getStaff(lead.ownerId);
  const history = activitiesForLead(lead.id);
  const openTasks = tasksForLead(lead.id);
  const bikeName = bike ? `${bike.brand} ${bike.model}` : "a moto";

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/leads" className="text-sm text-primary-600">
        ← Interesses
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{person?.name}</h1>
        <StageBadge status={lead.status} />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        {lead.id} · responsável {owner?.name}
        {person ? (
          <>
            {" "}
            · <Link href={`/admin/pessoas/${person.id}`} className="text-primary-600">ver pessoa</Link>
          </>
        ) : null}
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <section className="space-y-3 rounded-2xl bg-white p-6 text-sm lg:col-span-3">
          <p>
            <strong>Telefone:</strong> {person?.phone}
          </p>
          <p>
            <strong>E-mail:</strong> {person?.email}
          </p>
          <p>
            <strong>Moto:</strong>{" "}
            {bike ? (
              bike.status === "active" ? (
                <Link className="text-primary-600" href={`/motos/${bike.slug}`}>
                  {bikeName}
                </Link>
              ) : (
                <span>
                  {bikeName} ({bike.status === "sold" ? "vendida, fora do site" : "pausada"})
                </span>
              )
            ) : (
              lead.bikeId
            )}
            {bike ? <span className="text-gray-500"> · {formatCurrency(bike.price)}</span> : null}
          </p>
          <p>
            <strong>Mensagem:</strong> {lead.message}
          </p>
          {lead.lostReason ? (
            <p>
              <strong>Motivo da perda:</strong> {lostReasonLabel[lead.lostReason]}
            </p>
          ) : null}
          {person ? (
            <a
              className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-white"
              href={whatsappHref(person.phone, `Olá ${person.name}, aqui é da Apex Motos sobre a ${bikeName}.`)}
              target="_blank"
              rel="noreferrer"
            >
              Chamar no WhatsApp
            </a>
          ) : null}
          <label className="block pt-2">
            Alterar estágio
            <select className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3" defaultValue={lead.status}>
              <option value="novo">Novo</option>
              <option value="contactado">Contactado</option>
              <option value="negociacao">Em negociação</option>
              <option value="fechado">Fechado</option>
              <option value="perdido">Perdido</option>
            </select>
          </label>
          <button type="button" className="h-11 rounded-lg bg-primary-600 px-4 font-semibold text-white">
            Salvar estágio (demo)
          </button>
          <p className="text-xs text-gray-500">
            No sistema final, Fechado marca a moto como vendida. Perdido exige o motivo.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 text-sm lg:col-span-2">
          <h2 className="font-semibold">Tarefas</h2>
          <ul className="mt-3 space-y-3">
            {openTasks.map((task) => {
              const timing = taskTiming(task.dueAt, task.done);
              return (
                <li key={task.id} className="border-b border-gray-50 pb-3">
                  <p className={task.done ? "text-gray-400 line-through" : "font-medium"}>{task.title}</p>
                  <p className="text-xs text-gray-500">
                    {timingLabel[timing]} · {formatDateTime(task.dueAt)} · {getStaff(task.assigneeId)?.name}
                  </p>
                </li>
              );
            })}
          </ul>
          <button type="button" className="mt-4 text-sm font-semibold text-primary-600">
            Nova tarefa (demo)
          </button>
        </section>
      </div>

      <section className="mt-4 rounded-2xl bg-white p-6">
        <h2 className="font-semibold">Histórico</h2>
        <ol className="mt-4 space-y-4">
          {history.map((activity) => (
            <li key={activity.id} className="border-l-2 border-cream pl-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {activityLabel[activity.type]} · {formatDateTime(activity.at)}
                {activity.authorId ? ` · ${getStaff(activity.authorId)?.name}` : ""}
              </p>
              <p className="mt-1 text-sm">{activity.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
