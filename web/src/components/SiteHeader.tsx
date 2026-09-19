"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { company } from "@/lib/data";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Motos" },
  { href: "/sobre", label: "Quem somos" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            A
          </span>
          <span>
            {company.name}
            <span className="block text-xs font-medium text-gray-500">Revenda de motos</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary-600",
                pathname === link.href && "text-primary-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/catalogo"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Search className="h-4 w-4" />
            Buscar
          </Link>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            className="inline-flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
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
