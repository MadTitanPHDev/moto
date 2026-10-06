export type DocGroup = "Comece aqui" | "Comercial" | "Produto" | "Técnico" | "Índice";
export type DocCollection = "Marketplace" | "CRM";

export type DocumentMeta = {
  slug: string;
  file: string;
  title: string;
  subtitle: string;
  reading: string;
  group: DocGroup;
  collection: DocCollection;
};

export const documents: DocumentMeta[] = [
  {
    slug: "comece-aqui",
    file: "START_HERE_PERMUTA.md",
    title: "Comece aqui",
    subtitle: "Plano de ação em 5 passos para oferecer o site em permuta.",
    reading: "15 min",
    group: "Comece aqui",
    collection: "Marketplace",
  },
  {
    slug: "proposta-comercial",
    file: "PROPOSTA_COMERCIAL.md",
    title: "Proposta comercial",
    subtitle: "O que a loja recebe, modelo de troca e ROI.",
    reading: "20 min",
    group: "Comercial",
    collection: "Marketplace",
  },
  {
    slug: "estrategia-apresentacao",
    file: "ESTRATEGIA_APRESENTACAO.md",
    title: "Estratégia de apresentação",
    subtitle: "Roteiro da reunião, objeções e follow-up.",
    reading: "25 min",
    group: "Comercial",
    collection: "Marketplace",
  },
  {
    slug: "contrato-permuta",
    file: "CONTRATO_PERMUTA_MODELO.md",
    title: "Modelo de contrato",
    subtitle: "Base jurídica da permuta — revisar com um advogado.",
    reading: "Referência",
    group: "Comercial",
    collection: "Marketplace",
  },
  {
    slug: "resumo-executivo",
    file: "RESUMO_EXECUTIVO.md",
    title: "Resumo executivo",
    subtitle: "Visão rápida do produto para decisão.",
    reading: "10 min",
    group: "Produto",
    collection: "Marketplace",
  },
  {
    slug: "plano-do-projeto",
    file: "PLANO_PROJETO.md",
    title: "Plano do projeto",
    subtitle: "Escopo, requisitos, roadmap e riscos.",
    reading: "45–60 min",
    group: "Produto",
    collection: "Marketplace",
  },
  {
    slug: "ux-ui",
    file: "UX_UI_DESIGN.md",
    title: "UX e UI",
    subtitle: "Design system, jornadas e wireframes.",
    reading: "40–50 min",
    group: "Produto",
    collection: "Marketplace",
  },
  {
    slug: "arquitetura",
    file: "ARQUITETURA_TECNICA.md",
    title: "Arquitetura técnica",
    subtitle: "Stack, pastas, segurança e observabilidade.",
    reading: "30–40 min",
    group: "Técnico",
    collection: "Marketplace",
  },
  {
    slug: "guia-implementacao",
    file: "GUIA_IMPLEMENTACAO.md",
    title: "Guia de implementação",
    subtitle: "Setup, testes, deploy e checklist de lançamento.",
    reading: "35–45 min",
    group: "Técnico",
    collection: "Marketplace",
  },
  {
    slug: "exemplos-de-codigo",
    file: "EXEMPLOS_CODIGO.md",
    title: "Exemplos de código",
    subtitle: "Snippets prontos de backend e frontend.",
    reading: "Referência",
    group: "Técnico",
    collection: "Marketplace",
  },
  {
    slug: "indice",
    file: "README.md",
    title: "Índice da documentação",
    subtitle: "Mapa completo dos arquivos do planejamento.",
    reading: "5 min",
    group: "Índice",
    collection: "Marketplace",
  },
  {
    slug: "crm-indice",
    file: "crm/README.md",
    title: "Índice do CRM",
    subtitle: "Mapa do site de vitrine e do CRM da revenda.",
    reading: "5 min",
    group: "Comece aqui",
    collection: "CRM",
  },
  {
    slug: "crm-comece-aqui",
    file: "crm/comercial/START_HERE_PERMUTA.md",
    title: "Comece aqui",
    subtitle: "Permuta do site de vitrine com CRM, em 5 passos.",
    reading: "15 min",
    group: "Comece aqui",
    collection: "CRM",
  },
  {
    slug: "crm-proposta-comercial",
    file: "crm/comercial/PROPOSTA_COMERCIAL.md",
    title: "Proposta comercial",
    subtitle: "Escopo da vitrine e do funil, troca e cronograma.",
    reading: "20 min",
    group: "Comercial",
    collection: "CRM",
  },
  {
    slug: "crm-estrategia-apresentacao",
    file: "crm/comercial/ESTRATEGIA_APRESENTACAO.md",
    title: "Estratégia de apresentação",
    subtitle: "Como mostrar o site e a ficha do interessado na reunião.",
    reading: "25 min",
    group: "Comercial",
    collection: "CRM",
  },
  {
    slug: "crm-contrato-permuta",
    file: "crm/comercial/CONTRATO_PERMUTA_MODELO.md",
    title: "Modelo de contrato",
    subtitle: "Permuta do CRM e da vitrine — revisar com um advogado.",
    reading: "Referência",
    group: "Comercial",
    collection: "CRM",
  },
  {
    slug: "crm-resumo-executivo",
    file: "crm/produto/RESUMO_EXECUTIVO.md",
    title: "Resumo executivo",
    subtitle: "Visão do CRM da loja e do site público.",
    reading: "10 min",
    group: "Produto",
    collection: "CRM",
  },
  {
    slug: "crm-plano-do-projeto",
    file: "crm/produto/PLANO_PROJETO.md",
    title: "Plano do projeto",
    subtitle: "Requisitos, funil, pessoas, tarefas e roadmap.",
    reading: "45–60 min",
    group: "Produto",
    collection: "CRM",
  },
  {
    slug: "crm-ux-ui",
    file: "crm/produto/UX_UI_DESIGN.md",
    title: "UX e UI",
    subtitle: "Jornada do visitante e operação do CRM no celular.",
    reading: "40–50 min",
    group: "Produto",
    collection: "CRM",
  },
  {
    slug: "crm-arquitetura",
    file: "crm/tecnico/ARQUITETURA_TECNICA.md",
    title: "Arquitetura técnica",
    subtitle: "Next.js, PostgreSQL e fluxos de interesse e venda.",
    reading: "30–40 min",
    group: "Técnico",
    collection: "CRM",
  },
  {
    slug: "crm-seguranca",
    file: "crm/tecnico/SEGURANCA.md",
    title: "Segurança",
    subtitle: "Login só da loja, sessão, dados pessoais e auditoria.",
    reading: "15 min",
    group: "Técnico",
    collection: "CRM",
  },
  {
    slug: "crm-guia-implementacao",
    file: "crm/tecnico/GUIA_IMPLEMENTACAO.md",
    title: "Guia de implementação",
    subtitle: "Ordem de construção a partir do protótipo visual.",
    reading: "35–45 min",
    group: "Técnico",
    collection: "CRM",
  },
  {
    slug: "crm-exemplos-de-codigo",
    file: "crm/tecnico/EXEMPLOS_CODIGO.md",
    title: "Exemplos de código",
    subtitle: "Schema de pessoa, interesse, atividade e tarefa.",
    reading: "Referência",
    group: "Técnico",
    collection: "CRM",
  },
];

export const groups: DocGroup[] = ["Comece aqui", "Comercial", "Produto", "Técnico", "Índice"];
export const collections: DocCollection[] = ["Marketplace", "CRM"];

export function getDocument(slug: string) {
  return documents.find((doc) => doc.slug === slug);
}

export function normalizeDocPath(file: string) {
  const parts: string[] = [];
  for (const part of file.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return parts.join("/");
}

export function getDocumentByFile(file: string) {
  const normalized = normalizeDocPath(file).toLowerCase();
  return documents.find((doc) => doc.file.toLowerCase() === normalized);
}

export function documentsByCollection() {
  return collections.map((collection) => ({
    collection,
    groups: groups
      .map((group) => ({
        group,
        items: documents.filter((doc) => doc.collection === collection && doc.group === group),
      }))
      .filter((group) => group.items.length > 0),
  }));
}
