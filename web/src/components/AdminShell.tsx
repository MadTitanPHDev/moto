"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bike,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { company } from "@/lib/data";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard },
  { href: "/admin/motos", label: "Motos", icon: Bike },
  { href: "/admin/leads", label: "Interessados", icon: Users },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-60 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="border-b border-gray-100 px-4 py-5">
          <p className="text-xl font-extrabold tracking-tight">apexmotos</p>
          <p className="text-xs text-gray-500">Área da loja · {company.city}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
          {links.map((link) => {
            const Icon = link.icon;
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 font-medium",
                  active
                    ? "rounded-full bg-ink text-white"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/"
          className="flex items-center gap-2 border-t border-gray-100 px-4 py-4 text-sm text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4" />
          Voltar ao site
        </Link>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex gap-3 overflow-x-auto border-b border-gray-200 bg-white px-4 py-3 text-sm md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap font-medium">
              {link.label}
            </Link>
          ))}
        </div>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
