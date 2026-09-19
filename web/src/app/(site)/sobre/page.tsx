import { company } from "@/lib/data";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Quem somos</p>
      <h1 className="mt-2 text-4xl font-bold">A loja por trás do pátio</h1>
      <p className="mt-4 text-lg text-gray-600">
        A {company.name} nasceu em {company.city} para vender motos com transparência: preço visível,
        ficha completa e atendimento humano — sem mandar o cliente caçar informação no Instagram.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5">
          <p className="text-3xl font-bold text-primary-600">{company.years}</p>
          <p className="text-sm text-gray-500">anos de mercado</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-3xl font-bold text-primary-600">{company.sales}</p>
          <p className="text-sm text-gray-500">motos entregues</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-3xl font-bold text-primary-600">100%</p>
          <p className="text-sm text-gray-500">documentação conferida</p>
        </div>
      </div>
      <div className="mt-10 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-900">Por que comprar aqui</h2>
        <p>✓ Estoque próprio, sem intermediário escondido.</p>
        <p>✓ Garantia e revisão antes da entrega.</p>
        <p>✓ Financiamento e troca do usado.</p>
        <p>✓ Loja física para ver a moto, não só a foto.</p>
      </div>
    </div>
  );
}
