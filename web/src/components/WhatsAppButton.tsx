import { MessageCircle } from "lucide-react";
import { company } from "@/lib/data";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Olá! Vi o site da Apex Motos e quero falar com um vendedor.")}`}
      className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-success px-4 font-semibold text-white shadow-lg hover:brightness-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
