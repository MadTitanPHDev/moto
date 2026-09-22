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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight">Tenho interesse</h2>
          <button type="button" onClick={onClose} aria-label="Fechar">
            <X />
          </button>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          {bike.brand} {bike.model} · {bike.year}
        </p>
        {sent ? (
          <p className="rounded-full bg-cream px-5 py-4 text-sm">
            Interesse registrado neste protótipo. No site final, o dado entra no painel e o vendedor
            recebe WhatsApp + e-mail.
          </p>
        ) : (
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <input className="h-12 w-full rounded-full border border-gray-300 px-5" placeholder="Nome" required />
            <input className="h-12 w-full rounded-full border border-gray-300 px-5" placeholder="Telefone" required />
            <input className="h-12 w-full rounded-full border border-gray-300 px-5" placeholder="E-mail" type="email" required />
            <textarea className="h-24 w-full rounded-3xl border border-gray-300 px-5 py-3" placeholder="Mensagem" />
            <button
              type="submit"
              className="h-12 w-full rounded-full bg-ink font-extrabold uppercase tracking-[0.14em] text-white"
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
