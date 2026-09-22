"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { BikeCard } from "@/components/BikeCard";
import { InterestModal } from "@/components/InterestModal";
import { company, getActiveBikes, getBike } from "@/lib/data";
import { formatCurrency, formatKm } from "@/lib/format";

export default function BikeDetailPage() {
  const params = useParams<{ id: string }>();
  const bike = getBike(params.id);
  const [photo, setPhoto] = useState(0);
  const [open, setOpen] = useState(false);

  if (!bike || bike.status === "paused") notFound();

  const similar = getActiveBikes()
    .filter((item) => item.id !== bike.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs text-gray-500">
        <Link href="/">Início</Link> / <Link href="/catalogo">Catálogo</Link> / {bike.brand} {bike.model}
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image src={bike.images[photo]} alt={`${bike.brand} ${bike.model}`} fill className="object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {bike.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(index)}
                className={`relative h-16 w-16 overflow-hidden ${
                  photo === index ? "ring-2 ring-ink" : "opacity-70"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <aside className="lg:pt-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {bike.brand} {bike.model}
          </h1>
          <p className="mt-3 text-xl">{formatCurrency(bike.price)}</p>
          <p className="mt-2 text-sm text-gray-500">
            {bike.year} · {formatKm(bike.mileage)}
            {bike.negotiable ? " · Negociável" : ""}
          </p>

          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.14em]">Detalhes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[bike.year, formatKm(bike.mileage), bike.color, bike.abs ? "ABS" : "—"].map((chip) => (
              <span
                key={chip}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-gray-300 px-4 text-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-8 h-12 w-full rounded-full bg-ink font-extrabold uppercase tracking-[0.14em] text-white"
          >
            Tenho interesse
          </button>
          <a
            href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Olá, tenho interesse na ${bike.brand} ${bike.model}`)}`}
            className="mt-3 flex h-12 items-center justify-center rounded-full border border-ink text-sm font-extrabold uppercase tracking-[0.14em]"
          >
            WhatsApp
          </a>

          <p className="mt-8 text-sm leading-relaxed text-gray-600">{bike.description}</p>
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>Cor: {bike.color}</li>
            <li>Motor: {bike.engineCc} cc</li>
            <li>Câmbio: {bike.transmission}</li>
            <li>30 dias para devolução de todos os itens</li>
          </ul>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-extrabold tracking-tight">Você também pode gostar</h2>
        <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => (
            <BikeCard key={item.id} bike={item} />
          ))}
        </div>
      </section>

      <InterestModal bike={bike} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
