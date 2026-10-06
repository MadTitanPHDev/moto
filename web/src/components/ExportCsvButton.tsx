"use client";

import { getBike, getPerson, getStaff, leads, leadStatusLabel } from "@/lib/data";

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function ExportCsvButton() {
  function download() {
    const header = ["Data", "Nome", "Telefone", "E-mail", "Moto", "Estágio", "Responsável", "Mensagem"];
    const rows = leads.map((lead) => {
      const person = getPerson(lead.personId);
      const bike = getBike(lead.bikeId);
      const owner = getStaff(lead.ownerId);
      return [
        lead.createdAt,
        person?.name ?? "",
        person?.phone ?? "",
        person?.email ?? "",
        bike ? `${bike.brand} ${bike.model}` : lead.bikeId,
        leadStatusLabel[lead.status],
        owner?.name ?? "",
        lead.message,
      ];
    });
    const csv = [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "interesses-apex-motos.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={download} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
      Exportar CSV
    </button>
  );
}
