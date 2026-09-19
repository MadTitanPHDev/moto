import Link from "next/link";
import { BikeCard } from "@/components/BikeCard";
import { company, getFeaturedBikes } from "@/lib/data";
import { ShieldCheck, RefreshCw, BadgeCheck, CreditCard } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedBikes();

  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm uppercase tracking-widest text-primary-100">Estoque de motos</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">
            Encontre a moto dos seus sonhos
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{company.tagline}</p>
          <form
            action="/catalogo"
            className="mt-8 grid max-w-3xl gap-3 rounded-2xl bg-white p-4 text-gray-900 md:grid-cols-4"
          >
            <select name="marca" className="h-11 rounded-lg border border-gray-300 px-3" defaultValue="">
              <option value="">Todas as marcas</option>
              <option>Honda</option>
              <option>Yamaha</option>
              <option>Kawasaki</option>
              <option>Suzuki</option>
            </select>
            <select name="ano" className="h-11 rounded-lg border border-gray-300 px-3" defaultValue="">
              <option value="">Qualquer ano</option>
              <option value="2024">2024+</option>
              <option value="2022">2022+</option>
              <option value="2020">2020+</option>
            </select>
            <select name="preco" className="h-11 rounded-lg border border-gray-300 px-3" defaultValue="">
              <option value="">Qualquer preço</option>
              <option value="20000">Até R$ 20 mil</option>
              <option value="35000">Até R$ 35 mil</option>
              <option value="50000">Até R$ 50 mil</option>
            </select>
            <button className="h-11 rounded-lg bg-primary-600 font-semibold text-white hover:bg-primary-700">
              Ver estoque
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Destaques da semana</h2>
            <p className="text-gray-500">As motos mais procuradas da loja agora.</p>
          </div>
          <Link href="/catalogo" className="text-sm font-semibold text-primary-600">
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-4">
          {[
            { icon: BadgeCheck, title: `${company.years} anos`, text: "Tradição no varejo de motos" },
            { icon: ShieldCheck, title: "Garantia", text: "Todas as motos conferidas na loja" },
            { icon: CreditCard, title: "Financiamento", text: "Entrada e parcelas facilitadas" },
            { icon: RefreshCw, title: "Aceita troca", text: "Sua moto usada entra no negócio" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-100 p-5">
              <item.icon className="h-6 w-6 text-primary-600" />
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
