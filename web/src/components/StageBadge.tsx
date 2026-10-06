import { leadStatusLabel, type LeadStatus } from "@/lib/data";
import { cn } from "@/lib/cn";

const stageClass: Record<LeadStatus, string> = {
  novo: "bg-cream text-ink",
  contactado: "bg-gray-100 text-ink",
  negociacao: "bg-ink text-white",
  fechado: "border border-ink bg-white text-ink",
  perdido: "bg-gray-100 text-gray-500",
};

export function StageBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold", stageClass[status])}>
      {leadStatusLabel[status]}
    </span>
  );
}
