"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { company } from "@/lib/data";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Motos" },
  { href: "/sobre", label: "Quem somos" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-[1.65rem] font-extrabold leading-none tracking-tight text-ink">
          apexmotos
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("hover:opacity-50", pathname === link.href && "underline underline-offset-8")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/catalogo" className="rounded-full p-2 text-ink" aria-label="Buscar">
            <Search className="h-5 w-5" strokeWidth={2.2} />
          </Link>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            className="hidden rounded-full bg-ink px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white md:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-extrabold uppercase tracking-[0.14em]">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
