import Link from "next/link";

const groups = [
  {
    title: "Site da loja",
    items: [
      ["Início", "/"],
      ["Catálogo com filtros", "/catalogo"],
      ["Detalhe da moto", "/motos/honda-cb-500x-2022"],
      ["Quem somos", "/sobre"],
      ["Contato", "/contato"],
      ["Blog", "/blog"],
      ["Artigo do blog", "/blog/como-escolher-primeira-moto"],
    ],
  },
  {
    title: "Painel administrativo",
    items: [
      ["Entrar", "/admin/login"],
      ["Painel", "/admin"],
      ["Gestão de motos", "/admin/motos"],
      ["Nova moto (passo a passo)", "/admin/motos/nova"],
      ["Editar moto", "/admin/motos/cb500x-2022/editar"],
      ["Interessados", "/admin/leads"],
      ["Detalhe do interessado", "/admin/leads/L-1041"],
      ["Configurações", "/admin/configuracoes"],
    ],
  },
];

export default function MapaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-5xl font-extrabold tracking-tight">Mapa do protótipo</h1>
      <p className="mt-3 text-gray-600">
        Todas as páginas previstas no escopo da permuta (site + painel), em navegação visual. Sem
        backend ainda — o objetivo é mostrar o produto ao cliente.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-2xl bg-white p-5">
            <h2 className="font-semibold">{group.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {group.items.map(([label, href]) => (
                <li key={href}>
                  <Link className="text-primary-600 hover:underline" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
