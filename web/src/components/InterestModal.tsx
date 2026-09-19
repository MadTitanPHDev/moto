"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Bike } from "@/lib/data";

export function InterestModal({
  bike,
  open,
  onClose,
}: {
  bike: Bike;
  open: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tenho interesse</h2>
          <button type="button" onClick={onClose} aria-label="Fechar">
            <X />
          </button>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          {bike.brand} {bike.model} · {bike.year}
        </p>
        {sent ? (
          <p className="rounded-lg bg-primary-50 p-4 text-sm text-primary-700">
            Lead registrado neste protótipo. No site final, o dado entra no painel e o
            vendedor recebe WhatsApp + e-mail.
          </p>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <input className="h-10 w-full rounded-lg border border-gray-300 px-3" placeholder="Nome" required />
            <input className="h-10 w-full rounded-lg border border-gray-300 px-3" placeholder="Telefone" required />
            <input className="h-10 w-full rounded-lg border border-gray-300 px-3" placeholder="E-mail" type="email" required />
            <textarea
              className="h-24 w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Mensagem"
            />
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary-600 font-semibold text-white hover:bg-primary-700"
            >
              Enviar interesse
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
