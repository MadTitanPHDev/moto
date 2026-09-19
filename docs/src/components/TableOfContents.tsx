import type { TocItem } from "@/lib/markdown";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-24 pr-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Nesta página</p>
        <ul className="mt-3 max-h-[calc(100vh-8rem)] space-y-1 overflow-y-auto text-sm">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
              <a href={`#${item.id}`} className="block py-1 text-gray-600 hover:text-primary-700">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
