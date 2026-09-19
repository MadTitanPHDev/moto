import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/MarkdownView";
import { TableOfContents } from "@/components/TableOfContents";
import { documents } from "@/lib/documents";
import { loadDocument } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return documents.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = loadDocument(slug);
  if (!doc) return { title: "Documento" };
  return {
    title: `${doc.meta.title} | Documentação`,
    description: doc.meta.subtitle,
  };
}

export default async function DocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = loadDocument(slug);
  if (!doc) notFound();

  const index = documents.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? documents[index - 1] : null;
  const next = index < documents.length - 1 ? documents[index + 1] : null;

  return (
    <div className="flex gap-8 px-4 py-10 md:px-10">
      <article className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
          {doc.meta.group} · {doc.meta.reading}
        </p>
        <p className="mt-2 text-sm text-gray-500">{doc.meta.file}</p>
        <MarkdownView content={doc.content} />

        <nav className="mt-14 grid gap-3 border-t border-primary-100 pt-6 sm:grid-cols-2">
          {previous ? (
            <Link href={`/${previous.slug}`} className="rounded-xl border border-gray-300 bg-white p-4 hover:border-primary-500">
              <p className="text-xs text-gray-500">Anterior</p>
              <p className="font-semibold">{previous.title}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/${next.slug}`}
              className="rounded-xl border border-gray-300 bg-white p-4 text-right hover:border-primary-500"
            >
              <p className="text-xs text-gray-500">Próximo</p>
              <p className="font-semibold">{next.title}</p>
            </Link>
          ) : null}
        </nav>
      </article>
      <TableOfContents items={doc.toc} />
    </div>
  );
}
