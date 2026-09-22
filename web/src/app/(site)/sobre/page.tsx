import Image from "next/image";
import { company } from "@/lib/data";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-xs text-gray-500">Início / Quem somos</p>
      <h1 className="mt-8 text-center text-5xl font-extrabold tracking-tight">Quem somos</h1>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=80"
            alt="Apex Motos"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight underline decoration-2 underline-offset-8">
            nossa missão
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Nossa missão é trazer mais transparência para a compra de motos: inspirados pela
            estrada e movidos pela confiança.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            A {company.name} nasceu em {company.city} para vender com preço visível, ficha completa
            e atendimento humano — sem mandar o cliente caçar informação no Instagram.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-extrabold">{company.years}</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">anos</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">{company.sales}</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">entregas</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-xs uppercase tracking-wider text-gray-500">documentos ok</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
