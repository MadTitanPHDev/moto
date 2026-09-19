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
