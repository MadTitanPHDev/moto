"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { documents, documentsByGroup } from "@/lib/documents";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const groups = documentsByGroup();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (doc) =>
            doc.title.toLowerCase().includes(q) ||
            doc.subtitle.toLowerCase().includes(q) ||
            doc.file.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-primary-500 shadow-lg md:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-label="Abrir documentos"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-primary-100 bg-[#fbf8f3] px-4 py-6 md:static md:block",
          open ? "block" : "hidden md:block"
        )}
      >
        <Link href="/" className="block px-2" onClick={() => setOpen(false)}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">Apex Motos</p>
          <p className="mt-1 font-semibold text-gray-900">Documentação</p>
        </Link>

        <label className="mt-5 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar documento"
            className="w-full bg-transparent outline-none"
          />
        </label>

        <nav className="mt-6 space-y-6">
          {filtered.map((group) => (
            <div key={group.group}>
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                {group.group}
              </p>
              <ul className="mt-2 space-y-1">
                {group.items.map((doc) => {
                  const href = `/${doc.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={doc.slug}>
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-lg px-2 py-2 text-sm",
                          active
                            ? "bg-ink text-primary-500"
                            : "text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        )}
                      >
                        {doc.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-2 text-sm text-gray-500">Nenhum documento com “{query}”.</p>
          )}
        </nav>

        <p className="mt-8 px-2 text-xs text-gray-500">
          {documents.length} arquivos · textos originais da raiz do repositório
        </p>
      </aside>
    </>
  );
}
