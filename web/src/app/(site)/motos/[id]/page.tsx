"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Heart, Phone, Share2 } from "lucide-react";
import { BikeCard } from "@/components/BikeCard";
import { InterestModal } from "@/components/InterestModal";
import { company, getActiveBikes, getBike } from "@/lib/data";
import { formatCurrency, formatKm } from "@/lib/format";

export default function BikeDetailPage() {
  const params = useParams<{ id: string }>();
  const bike = getBike(params.id);
  const [photo, setPhoto] = useState(0);
  const [open, setOpen] = useState(false);

  if (!bike) notFound();

  const similar = getActiveBikes()
    .filter((item) => item.id !== bike.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link href="/catalogo" className="text-primary-600">
          ← Voltar ao catálogo
        </Link>
        <div className="flex gap-2">
          <button className="rounded-full border border-gray-300 p-2" aria-label="Favoritar">
            <Heart className="h-4 w-4" />
          </button>
          <button className="rounded-full border border-gray-300 p-2" aria-label="Compartilhar">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
            <Image src={bike.images[photo]} alt={`${bike.brand} ${bike.model}`} fill className="object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {bike.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setPhoto(index)}
                className={`relative h-16 w-24 overflow-hidden rounded-lg border ${
                  photo === index ? "border-primary-600" : "border-transparent"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Especificações</h2>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              {[
                ["Ano", `${bike.year}/${bike.manufacturingYear}`],
                ["KM", formatKm(bike.mileage)],
                ["Cor", bike.color],
                ["Motor", `${bike.engineCc} cc`],
                ["Câmbio", bike.transmission],
                ["Combustível", bike.fuelType],
                ["Freios", bike.abs ? "ABS" : "Convencional"],
                ["Único dono", bike.singleOwner ? "Sim" : "Não"],
                ["Aceita troca", bike.acceptTrade ? "Sim" : "Não"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white p-3">
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Opcionais</h2>
            <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2">
              {bike.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">Descrição</h2>
            <p className="mt-3 max-w-2xl text-gray-600">{bike.description}</p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-3xl font-bold text-primary-600">{formatCurrency(bike.price)}</p>
          <h1 className="mt-1 text-2xl font-semibold">
            {bike.brand} {bike.model}
          </h1>
          <p className="text-gray-500">
            {bike.year} · {formatKm(bike.mileage)}
            {bike.negotiable ? " · Negociável" : ""}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 h-12 w-full rounded-lg bg-primary-600 font-semibold text-white hover:bg-primary-700"
          >
            Tenho interesse
          </button>
          <a
            href={`tel:${company.phone}`}
            className="mt-2 flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-300 font-semibold"
          >
            <Phone className="h-4 w-4" /> Ligar agora
          </a>
          <a
            href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Olá, tenho interesse na ${bike.brand} ${bike.model}`)}`}
            className="mt-2 flex h-12 items-center justify-center rounded-lg bg-success font-semibold text-white"
          >
            WhatsApp
          </a>
          <div className="mt-6 border-t border-gray-100 pt-4 text-sm">
            <p className="font-semibold">{company.name}</p>
            <p className="text-gray-500">⭐⭐⭐⭐⭐ {company.sales} vendas</p>
            <p className="text-success">Perfil verificado</p>
            <p className="mt-1 text-gray-500">
              {company.city}/{company.state}
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Outras motos</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {similar.map((item) => (
            <BikeCard key={item.id} bike={item} />
          ))}
        </div>
      </section>

      <InterestModal bike={bike} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
