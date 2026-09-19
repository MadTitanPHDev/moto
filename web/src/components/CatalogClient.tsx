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
      if (bike.status === "sold") return false;
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
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[240px_1fr]">
      <form action="/catalogo" className="h-fit space-y-4 rounded-2xl border border-gray-100 bg-white p-4">
        <h2 className="font-semibold">Filtros</h2>
        <label className="block text-sm">
          Busca
          <input
            name="q"
            defaultValue={q}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3"
            placeholder="Marca ou modelo"
          />
        </label>
        <label className="block text-sm">
          Marca
          <select name="marca" defaultValue={marca} className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3">
            <option value="">Todas</option>
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Ano mínimo
          <select name="ano" defaultValue={ano || ""} className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3">
            <option value="">Qualquer</option>
            <option value="2024">2024+</option>
            <option value="2022">2022+</option>
            <option value="2020">2020+</option>
          </select>
        </label>
        <label className="block text-sm">
          Preço máximo
          <select name="preco" defaultValue={preco || ""} className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3">
            <option value="">Qualquer</option>
            <option value="20000">Até R$ 20 mil</option>
            <option value="35000">Até R$ 35 mil</option>
            <option value="50000">Até R$ 50 mil</option>
          </select>
        </label>
        <button className="h-10 w-full rounded-lg bg-primary-600 text-sm font-semibold text-white">
          Aplicar
        </button>
      </form>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{filtered.length} motos encontradas</h1>
          <span className="text-sm text-gray-500">Ordenar: mais recentes</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>
    </div>
  );
}
