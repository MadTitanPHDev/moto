import Link from "next/link";
import { posts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs text-gray-500">Início / Blog</p>
      <h1 className="mt-6 text-5xl font-extrabold tracking-tight">Blog</h1>
      <div className="mt-10 divide-y divide-gray-100">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-8">
            <p className="text-xs uppercase tracking-[0.14em] text-gray-500">
              {post.date} · {post.readMinutes} min
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{post.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
