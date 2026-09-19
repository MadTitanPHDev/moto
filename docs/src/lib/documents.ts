export type DocGroup = "Comece aqui" | "Comercial" | "Produto" | "Técnico" | "Índice";

export type DocumentMeta = {
  slug: string;
  file: string;
  title: string;
  subtitle: string;
  reading: string;
  group: DocGroup;
};

export const documents: DocumentMeta[] = [
  {
    slug: "comece-aqui",
    file: "START_HERE_PERMUTA.md",
    title: "Comece aqui",
    subtitle: "Plano de ação em 5 passos para oferecer o site em permuta.",
    reading: "15 min",
    group: "Comece aqui",
  },
  {
    slug: "proposta-comercial",
    file: "PROPOSTA_COMERCIAL.md",
    title: "Proposta comercial",
    subtitle: "O que a loja recebe, modelo de troca e ROI.",
    reading: "20 min",
    group: "Comercial",
  },
  {
    slug: "estrategia-apresentacao",
    file: "ESTRATEGIA_APRESENTACAO.md",
    title: "Estratégia de apresentação",
    subtitle: "Roteiro da reunião, objeções e follow-up.",
    reading: "25 min",
    group: "Comercial",
  },
  {
    slug: "contrato-permuta",
    file: "CONTRATO_PERMUTA_MODELO.md",
    title: "Modelo de contrato",
    subtitle: "Base jurídica da permuta — revisar com um advogado.",
    reading: "Referência",
    group: "Comercial",
  },
  {
    slug: "resumo-executivo",
    file: "RESUMO_EXECUTIVO.md",
    title: "Resumo executivo",
    subtitle: "Visão rápida do produto para decisão.",
    reading: "10 min",
    group: "Produto",
  },
  {
    slug: "plano-do-projeto",
    file: "PLANO_PROJETO.md",
    title: "Plano do projeto",
    subtitle: "Escopo, requisitos, roadmap e riscos.",
    reading: "45–60 min",
    group: "Produto",
  },
  {
    slug: "ux-ui",
    file: "UX_UI_DESIGN.md",
    title: "UX e UI",
    subtitle: "Design system, jornadas e wireframes.",
    reading: "40–50 min",
    group: "Produto",
  },
  {
    slug: "arquitetura",
    file: "ARQUITETURA_TECNICA.md",
    title: "Arquitetura técnica",
    subtitle: "Stack, pastas, segurança e observabilidade.",
    reading: "30–40 min",
    group: "Técnico",
  },
  {
    slug: "guia-implementacao",
    file: "GUIA_IMPLEMENTACAO.md",
    title: "Guia de implementação",
    subtitle: "Setup, testes, deploy e checklist de lançamento.",
    reading: "35–45 min",
    group: "Técnico",
  },
  {
    slug: "exemplos-de-codigo",
    file: "EXEMPLOS_CODIGO.md",
    title: "Exemplos de código",
    subtitle: "Snippets prontos de backend e frontend.",
    reading: "Referência",
    group: "Técnico",
  },
  {
    slug: "indice",
    file: "README.md",
    title: "Índice da documentação",
    subtitle: "Mapa completo dos arquivos do planejamento.",
    reading: "5 min",
    group: "Índice",
  },
];

export const groups: DocGroup[] = ["Comece aqui", "Comercial", "Produto", "Técnico", "Índice"];

export function getDocument(slug: string) {
  return documents.find((doc) => doc.slug === slug);
}

export function getDocumentByFile(file: string) {
  const name = file.replace(/^\.\//, "").replace(/^\.\.\//, "");
  return documents.find((doc) => doc.file.toLowerCase() === name.toLowerCase());
}

export function documentsByGroup() {
  return groups.map((group) => ({
    group,
    items: documents.filter((doc) => doc.group === group),
  }));
}
