import { MessageCircle } from "lucide-react";
import { company } from "@/lib/data";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Olá! Vi o site da Apex Motos e quero falar com um vendedor.")}`}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
    </a>
  );
}
