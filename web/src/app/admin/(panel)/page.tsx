import Link from "next/link";
import { StageBadge } from "@/components/StageBadge";
import { bikes, getBike, getPerson, getStaff, leads, leadStages, tasks } from "@/lib/data";
import { formatDateTime, formatNumber, taskTiming } from "@/lib/format";

export default function AdminDashboardPage() {
  const active = bikes.filter((bike) => bike.status === "active").length;
  const views = bikes.reduce((sum, bike) => sum + bike.views, 0);
  const sold = bikes.filter((bike) => bike.status === "sold").length;
  const openDeals = leads.filter((lead) => lead.status !== "fechado" && lead.status !== "perdido").length;
  const attention = tasks
    .filter((task) => !task.done && taskTiming(task.dueAt, task.done) !== "em_dia")
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const top = [...bikes].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Painel</h1>
        <Link
          href="/admin/motos/nova"
          className="rounded-full bg-ink px-4 py-2 text-sm font-extrabold uppercase tracking-wider text-white"
        >
          + Adicionar moto
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Motos ativas", String(active)],
          ["Visualizações", formatNumber(views)],
          ["Interesses abertos", String(openDeals)],
          ["Vendas", String(sold)],
          ["Tarefas em atraso", String(tasks.filter((task) => taskTiming(task.dueAt, task.done) === "atrasada").length)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-5">
          <h2 className="font-semibold">Para hoje</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {attention.map((task) => {
              const lead = leads.find((item) => item.id === task.leadId);
              const person = lead ? getPerson(lead.personId) : undefined;
              const bike = lead ? getBike(lead.bikeId) : undefined;
              const timing = taskTiming(task.dueAt, task.done);
              return (
                <li key={task.id} className="border-b border-gray-50 pb-2">
                  <Link href={`/admin/leads/${task.leadId}`} className="font-medium">
                    {task.title}
                  </Link>
                  <p className="text-gray-500">
                    {person?.name}
                    {bike ? ` · ${bike.brand} ${bike.model}` : ""} · {timing === "atrasada" ? "Atrasada" : "Hoje"} ·{" "}
                    {formatDateTime(task.dueAt)} · {getStaff(task.assigneeId)?.name}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="rounded-2xl bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Funil</h2>
            <Link href="/admin/funil" className="text-sm text-primary-600">
              Abrir
            </Link>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {leadStages.map((stage) => (
              <li key={stage} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <StageBadge status={stage} />
                <span className="text-gray-500">{leads.filter((lead) => lead.status === stage).length}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="mt-6 rounded-2xl bg-white p-5">
        <h2 className="font-semibold">Motos mais vistas</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {top.map((bike) => (
            <li key={bike.id} className="flex justify-between border-b border-gray-50 pb-2">
              <span>
                {bike.brand} {bike.model}
              </span>
              <span className="text-gray-500">{bike.views} visualizações</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
