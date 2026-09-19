import Link from "next/link";
import { posts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-2 text-gray-500">Conteúdo para SEO e confiança — páginas planejadas na proposta.</p>
      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-xs text-gray-500">
              {post.date} · {post.readMinutes} min
            </p>
            <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
