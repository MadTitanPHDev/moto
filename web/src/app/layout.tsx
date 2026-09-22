import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Apex Motos | Presidente Prudente",
  description:
    "Protótipo visual de site e painel para revenda de motos em Presidente Prudente.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-gray-900">{children}</body>
    </html>
  );
}
