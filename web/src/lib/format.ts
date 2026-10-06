export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatNumber(value: number) {
  return value.toLocaleString("pt-BR");
}

export function formatKm(value: number) {
  return `${formatNumber(value)} km`;
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function taskTiming(dueAt: string, done: boolean, now = new Date()) {
  if (done) return "concluida" as const;
  const due = new Date(dueAt);
  if (due.getTime() < now.getTime()) return "atrasada" as const;
  if (due.toDateString() === now.toDateString()) return "hoje" as const;
  return "em_dia" as const;
}

export function whatsappHref(phone: string, text: string) {
  const digits = phone.replace(/\D/g, "");
  const withCountry = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(text)}`;
}
