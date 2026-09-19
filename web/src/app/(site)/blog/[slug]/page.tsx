import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/data";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="text-sm text-primary-600">
        ← Blog
      </Link>
      <p className="mt-4 text-xs text-gray-500">
        {post.date} · {post.readMinutes} min de leitura
      </p>
      <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
      <p className="mt-6 text-lg text-gray-600">{post.excerpt}</p>
      <p className="mt-6 text-gray-600">
        Esta é uma página de conteúdo do protótipo. No projeto final, cada artigo ajuda o site a
        aparecer no Google quando o cliente busca “motos em Campinas”, “financiamento de moto” e
        temas relacionados ao estoque da loja.
      </p>
    </article>
  );
}
