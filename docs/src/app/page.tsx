import Link from "next/link";
import { documentsByGroup } from "@/lib/documents";

export default function HomePage() {
  const groups = documentsByGroup();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">Biblioteca de documentos</p>
      <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Leia o planejamento como um site</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        Cada arquivo Markdown da raiz vira uma página, com sumário, busca e links internos. O texto continua
        sendo o original — isto só facilita a apresentação.
      </p>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.group}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">{group.group}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {group.items.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/${doc.slug}`}
                  className="rounded-2xl border border-primary-100 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-500 hover:shadow-md"
                >
                  <p className="text-xs text-gray-500">
                    {doc.file} · {doc.reading}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">{doc.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{doc.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
