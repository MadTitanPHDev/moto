import Image from "next/image";
import Link from "next/link";
import { BikeCard } from "@/components/BikeCard";
import { company, getFeaturedBikes } from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedBikes();
  const hero = featured[0];

  return (
    <>
      <section className="grid min-h-[70vh] md:grid-cols-2">
        <div className="flex flex-col justify-center bg-white px-8 py-16 md:px-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-500">
            Estoque em {company.city}
          </p>
          <h1 className="mt-4 max-w-md text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            Motos que podem causar elogios
          </h1>
          <p className="mt-5 max-w-sm text-gray-500">{company.tagline}</p>
          <Link
            href="/catalogo"
            className="mt-10 inline-flex w-fit rounded-full bg-ink px-10 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white"
          >
            Ver estoque
          </Link>
        </div>
        <div className="relative min-h-[320px] bg-gray-50">
          {hero && (
            <Image
              src={hero.images[0]}
              alt={`${hero.brand} ${hero.model}`}
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
          )}
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <Link href="/catalogo" className="relative min-h-[280px] bg-gray-100">
          <div className="absolute inset-0 flex items-end p-8">
            <span className="rounded-full bg-ink px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
              Ver motos
            </span>
          </div>
        </Link>
        <Link href="/sobre" className="relative min-h-[280px] bg-cream">
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <p className="text-sm font-semibold text-ink/70">Inspirados pela estrada, movidos pela confiança</p>
            <span className="mt-4 inline-flex w-fit rounded-full bg-ink px-6 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
              Nossa missão
            </span>
          </div>
        </Link>
      </section>

      <section className="bg-white px-4 py-20 text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gray-500">Encontre sua moto</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Apex Motos</h2>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Cadastre-se no protótipo e veja como a loja captura interesse — no site real, vale um
          desconto na primeira visita.
        </p>
        <form action="/contato" className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            name="email"
            type="email"
            placeholder="Seu e-mail"
            className="h-12 flex-1 rounded-full border border-gray-300 px-5 text-sm"
          />
          <button className="h-12 rounded-full bg-ink px-6 text-xs font-extrabold uppercase tracking-wider text-white">
            Enviar
          </button>
        </form>
      </section>
    </>
  );
}
