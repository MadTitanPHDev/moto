import Link from "next/link";
import { cn } from "@/lib/cn";
import { getBike, getLead, getPerson, getStaff, tasks } from "@/lib/data";
import { formatDateTime, taskTiming } from "@/lib/format";

const timingLabel = {
  atrasada: "Atrasada",
  hoje: "Hoje",
  em_dia: "Em dia",
  concluida: "Concluída",
};

export default function TasksPage() {
  const ordered = [...tasks].sort((a, b) => Number(a.done) - Number(b.done) || a.dueAt.localeCompare(b.dueAt));

  return (
    <div>
      <h1 className="text-2xl font-bold">Tarefas</h1>
      <p className="mt-1 text-sm text-gray-500">O que a equipe precisa fazer para o interesse não esfriar.</p>
      <ul className="mt-6 space-y-3">
        {ordered.map((task) => {
          const timing = taskTiming(task.dueAt, task.done);
          const lead = getLead(task.leadId);
          const person = lead ? getPerson(lead.personId) : undefined;
          const bike = lead ? getBike(lead.bikeId) : undefined;
          return (
            <li key={task.id} className="rounded-2xl bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={cn("font-medium", task.done && "text-gray-400 line-through")}>{task.title}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    <Link href={`/admin/leads/${task.leadId}`} className="text-primary-600">
                      {person?.name}
                    </Link>
                    {bike ? ` · ${bike.brand} ${bike.model}` : null}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    timing === "atrasada" ? "bg-cream text-ink" : "bg-gray-100 text-gray-600"
                  )}
                >
                  {timingLabel[timing]}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {formatDateTime(task.dueAt)} · {getStaff(task.assigneeId)?.name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
