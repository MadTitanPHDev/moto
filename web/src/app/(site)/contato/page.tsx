"use client";

import { useState } from "react";
import { company } from "@/lib/data";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">Fale com a loja</h1>
        <p className="mt-3 text-gray-600">
          Tire dúvida de estoque, financiamento ou agende uma visita. No produto final, cada
          mensagem vira lead no painel.
        </p>
        <div className="mt-8 space-y-3 text-sm text-gray-700">
          <p>
            <strong>Endereço:</strong> {company.address}
          </p>
          <p>
            <strong>Telefone:</strong> {company.phone}
          </p>
          <p>
            <strong>WhatsApp:</strong> {company.whatsappDisplay}
          </p>
          <p>
            <strong>Horário:</strong> {company.hours}
          </p>
        </div>
        <div className="mt-8 flex h-56 items-center justify-center rounded-2xl bg-gray-200 text-sm text-gray-600">
          Mapa da loja (demonstração) · Campinas/SP
        </div>
      </div>
      <form
        className="space-y-3 rounded-2xl bg-white p-6 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <h2 className="text-lg font-semibold">Formulário</h2>
        {sent ? (
          <p className="rounded-lg bg-primary-50 p-4 text-sm text-primary-700">
            Mensagem enviada neste protótipo. No site real, o lead aparece em Painel → Leads.
          </p>
        ) : (
          <>
            <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Nome" required />
            <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Telefone" required />
            <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="E-mail" type="email" />
            <textarea className="h-28 w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Mensagem" />
            <button className="h-11 w-full rounded-lg bg-primary-600 font-semibold text-white">
              Enviar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
