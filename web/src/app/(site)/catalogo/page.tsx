import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Carregando catálogo…</div>}>
      <CatalogClient />
    </Suspense>
  );
}
