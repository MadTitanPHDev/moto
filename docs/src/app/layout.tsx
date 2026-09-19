import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Documentação | Apex Motos",
  description: "Visualização em páginas da documentação de permuta, produto e implementação.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 font-sans text-gray-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
