import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Motos | Protótipo do site da loja",
  description:
    "Protótipo visual de site e painel para revenda de motos, para apresentação a clientes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 font-sans text-gray-900">{children}</body>
    </html>
  );
}
