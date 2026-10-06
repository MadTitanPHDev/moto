import Link from "next/link";
import { documentsByCollection } from "@/lib/documents";

const intros: Record<string, string> = {
  Marketplace: "Planejamento original de um marketplace aberto de veículos, com vários vendedores.",
  CRM: "Site de vitrine da revenda e CRM da equipe: pessoas, funil, histórico e tarefas.",
};

export default function HomePage() {
  const libraries = documentsByCollection();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">Biblioteca de documentos</p>
      <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Leia o planejamento como um site</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        Os Markdown da raiz e os da pasta <span className="font-medium text-gray-900">crm</span> viram páginas, com
        sumário e links internos. O texto continua sendo o arquivo original.
      </p>

      <div className="mt-10 space-y-14">
        {libraries.map((library) => (
          <section key={library.collection}>
            <h2 className="text-3xl font-semibold text-gray-900">{library.collection}</h2>
            <p className="mt-2 max-w-2xl text-gray-600">{intros[library.collection]}</p>
            <div className="mt-8 space-y-10">
              {library.groups.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">{group.group}</h3>
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
                        <h4 className="mt-1 text-xl font-semibold text-gray-900">{doc.title}</h4>
                        <p className="mt-2 text-sm text-gray-600">{doc.subtitle}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
