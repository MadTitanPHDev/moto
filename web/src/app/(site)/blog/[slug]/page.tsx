import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/data";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/blog" className="text-xs text-gray-500">
        Início / Blog
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-gray-500">
        {post.date} · {post.readMinutes} min
      </p>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight">{post.title}</h1>
      <p className="mt-8 text-lg leading-relaxed text-gray-600">{post.excerpt}</p>
      <p className="mt-6 leading-relaxed text-gray-600">
        Esta é uma página de conteúdo do protótipo. No projeto final, cada artigo ajuda o site a
        aparecer no Google quando o cliente busca “motos em Presidente Prudente”, “financiamento de moto” e
        temas relacionados ao estoque da loja.
      </p>
    </article>
  );
}
