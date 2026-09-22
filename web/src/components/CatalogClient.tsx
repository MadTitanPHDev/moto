"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BikeCard } from "@/components/BikeCard";
import { bikes, brands } from "@/lib/data";

export function CatalogClient() {
  const params = useSearchParams();
  const marca = params.get("marca") ?? "";
  const ano = Number(params.get("ano") ?? 0);
  const preco = Number(params.get("preco") ?? 0);
  const q = params.get("q") ?? "";

  const filtered = useMemo(() => {
    return bikes.filter((bike) => {
      if (bike.status === "sold" || bike.status === "paused") return false;
      if (marca && bike.brand !== marca) return false;
      if (ano && bike.year < ano) return false;
      if (preco && bike.price > preco) return false;
      if (q) {
        const hay = `${bike.brand} ${bike.model} ${bike.color}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [marca, ano, preco, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs text-gray-500">Início / Catálogo / Todas</p>
      <form action="/catalogo" className="mt-6 flex flex-wrap items-end gap-3">
        <input
          name="q"
          defaultValue={q}
          className="h-11 min-w-[180px] flex-1 rounded-full border border-gray-300 px-4 text-sm"
          placeholder="Marca ou modelo"
        />
        <select name="marca" defaultValue={marca} className="h-11 rounded-full border border-gray-300 px-4 text-sm">
          <option value="">Todas as marcas</option>
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
        <select name="ano" defaultValue={ano || ""} className="h-11 rounded-full border border-gray-300 px-4 text-sm">
          <option value="">Qualquer ano</option>
          <option value="2024">2024+</option>
          <option value="2022">2022+</option>
          <option value="2020">2020+</option>
        </select>
        <select name="preco" defaultValue={preco || ""} className="h-11 rounded-full border border-gray-300 px-4 text-sm">
          <option value="">Qualquer preço</option>
          <option value="20000">Até R$ 20 mil</option>
          <option value="35000">Até R$ 35 mil</option>
          <option value="50000">Até R$ 50 mil</option>
        </select>
        <button className="h-11 rounded-full bg-ink px-6 text-xs font-extrabold uppercase tracking-wider text-white">
          Aplicar
        </button>
      </form>

      <div className="mt-10 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
}
