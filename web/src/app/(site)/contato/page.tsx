"use client";

import { useState } from "react";
import { company } from "@/lib/data";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2">
      <div>
        <p className="text-xs text-gray-500">Início / Contato</p>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight">Fale com a loja</h1>
        <p className="mt-4 max-w-md text-gray-600">
          Tire dúvida de estoque, financiamento ou agende uma visita. No produto final, cada
          mensagem vira um interessado no painel.
        </p>
        <div className="mt-8 space-y-2 text-sm text-gray-700">
          <p>{company.address}</p>
          <p>{company.phone}</p>
          <p>{company.whatsappDisplay}</p>
          <p>{company.hours}</p>
        </div>
      </div>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <h2 className="text-sm font-extrabold uppercase tracking-[0.16em]">Encontre sua moto</h2>
        {sent ? (
          <p className="rounded-full bg-cream px-5 py-4 text-sm">
            Mensagem enviada neste protótipo. No site real, o interessado aparece em Painel → Interessados.
          </p>
        ) : (
          <>
            <input className="h-12 w-full rounded-full border border-gray-300 px-5" placeholder="Nome" required />
            <input className="h-12 w-full rounded-full border border-gray-300 px-5" placeholder="Telefone" required />
            <input className="h-12 w-full rounded-full border border-gray-300 px-5" placeholder="E-mail" type="email" />
            <textarea className="h-28 w-full rounded-3xl border border-gray-300 px-5 py-3" placeholder="Mensagem" />
            <button className="h-12 w-full rounded-full bg-ink font-extrabold uppercase tracking-[0.14em] text-white">
              Enviar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
