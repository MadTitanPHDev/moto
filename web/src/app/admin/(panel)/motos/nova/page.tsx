"use client";

import { useState } from "react";
import Link from "next/link";

const steps = ["Dados", "Especificações", "Fotos", "Revisão"];

export default function NovaMotoPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Adicionar moto</h1>
      <p className="text-sm text-gray-500">Wizard guiado — no produto final grava no estoque em minutos.</p>
      <div className="mt-6 flex gap-2 text-sm">
        {steps.map((label, index) => (
          <span
            key={label}
            className={`rounded-full px-3 py-1 ${index === step ? "bg-primary-600 text-white" : "bg-gray-100"}`}
          >
            {index + 1}. {label}
          </span>
        ))}
      </div>

      {done ? (
        <div className="mt-8 rounded-2xl bg-white p-6">
          <p className="font-semibold text-success">Moto publicada neste protótipo.</p>
          <p className="mt-2 text-sm text-gray-500">
            No sistema real ela entra no catálogo e no Google. Aqui só demonstramos o fluxo.
          </p>
          <Link href="/admin/motos" className="mt-4 inline-block text-primary-600">
            Voltar para a lista
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3 rounded-2xl bg-white p-6">
          {step === 0 && (
            <>
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Marca" defaultValue="Honda" />
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Modelo" defaultValue="CB 500X" />
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Ano" defaultValue="2022" />
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Preço" defaultValue="35900" />
            </>
          )}
          {step === 1 && (
            <>
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="KM" defaultValue="5000" />
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Cor" defaultValue="Vermelha" />
              <input className="h-11 w-full rounded-lg border border-gray-300 px-3" placeholder="Motor (cc)" defaultValue="471" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked /> ABS
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked /> Aceita troca
              </label>
            </>
          )}
          {step === 2 && (
            <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-500">
              Arraste as fotos aqui (até 20) — demonstração visual
            </div>
          )}
          {step === 3 && (
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Honda CB 500X 2022</li>
              <li>R$ 35.900 · 5.000 km · Vermelha · ABS</li>
              <li>Status: ativa no catálogo após publicar</li>
            </ul>
          )}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              Voltar
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => {
                if (step === steps.length - 1) setDone(true);
                else setStep((value) => value + 1);
              }}
            >
              {step === steps.length - 1 ? "Publicar" : "Continuar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
