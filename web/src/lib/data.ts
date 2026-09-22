export type BikeStatus = "active" | "paused" | "sold";
export type LeadStatus = "novo" | "contactado" | "negociacao" | "fechado" | "perdido";

export type Bike = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  manufacturingYear: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  engineCc: number;
  price: number;
  negotiable: boolean;
  acceptTrade: boolean;
  city: string;
  state: string;
  description: string;
  features: string[];
  images: string[];
  status: BikeStatus;
  views: number;
  favorites: number;
  leads: number;
  singleOwner: boolean;
  abs: boolean;
  featured: boolean;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  bikeId: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
};

export const company = {
  name: "Apex Motos",
  tagline: "Qualidade, confiança e tradição desde 2010",
  city: "Presidente Prudente",
  state: "SP",
  address: "Av. Coronel José Soares Marcondes, 2100 — Centro, Presidente Prudente/SP",
  phone: "(18) 3222-4400",
  whatsapp: "5518999887766",
  whatsappDisplay: "(18) 99988-7766",
  email: "contato@apexmotos.com.br",
  instagram: "@apexmotos",
  hours: "Seg a Sex 9h–18h · Sáb 9h–13h",
  years: 16,
  sales: 1240,
};

const img = (id: string, extra = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80${extra}`;

export const bikes: Bike[] = [
  {
    id: "cb500x-2022",
    slug: "honda-cb-500x-2022",
    brand: "Honda",
    model: "CB 500X",
    version: "ABS",
    year: 2022,
    manufacturingYear: 2022,
    mileage: 5000,
    color: "Vermelha",
    fuelType: "Gasolina",
    transmission: "Manual",
    engineCc: 471,
    price: 35900,
    negotiable: true,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Moto em estado de zero. Todas as revisões em dia na concessionária, único dono, manual e chave reserva. Aceito seu usado na troca e financio.",
    features: ["ABS", "Painel digital", "Protetor de motor", "Baú traseiro", "LED"],
    images: [
      img("photo-1558981806-ec527fa84c39"),
      img("photo-1558981403-c5f9899a28bc"),
      img("photo-1558981359-3495844d1e1c"),
    ],
    status: "active",
    views: 234,
    favorites: 12,
    leads: 5,
    singleOwner: true,
    abs: true,
    featured: true,
  },
  {
    id: "mt07-2023",
    slug: "yamaha-mt-07-2023",
    brand: "Yamaha",
    model: "MT-07",
    version: "ABS",
    year: 2023,
    manufacturingYear: 2023,
    mileage: 2100,
    color: "Azul",
    fuelType: "Gasolina",
    transmission: "Manual",
    engineCc: 689,
    price: 42500,
    negotiable: true,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Naked esportiva com pouquíssimo uso. Pneus novos, isenta de detalhes. Ideal para quem quer torque e agilidade no dia a dia.",
    features: ["ABS", "Controle de tração", "Slipper clutch", "LED", "USB"],
    images: [
      img("photo-1568772585407-9361f9bf3a87"),
      img("photo-1558981806-ec527fa84c39"),
    ],
    status: "active",
    views: 189,
    favorites: 18,
    leads: 8,
    singleOwner: true,
    abs: true,
    featured: true,
  },
  {
    id: "z400-2021",
    slug: "kawasaki-z400-2021",
    brand: "Kawasaki",
    model: "Z400",
    year: 2021,
    manufacturingYear: 2021,
    mileage: 8000,
    color: "Verde",
    fuelType: "Gasolina",
    transmission: "Manual",
    engineCc: 399,
    price: 38000,
    negotiable: false,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Naked compacta, excelente para cidade. Freios ABS, revisões em dia e documentação 100% regular.",
    features: ["ABS", "Painel digital", "Escape original"],
    images: [
      img("photo-1609630875171-b1321377ee65"),
      img("photo-1615172282427-9a57ef2d142e"),
    ],
    status: "active",
    views: 156,
    favorites: 9,
    leads: 3,
    singleOwner: false,
    abs: true,
    featured: true,
  },
  {
    id: "gsx-s750-2020",
    slug: "suzuki-gsx-s750-2020",
    brand: "Suzuki",
    model: "GSX-S750",
    year: 2020,
    manufacturingYear: 2020,
    mileage: 12000,
    color: "Preta",
    fuelType: "Gasolina",
    transmission: "Manual",
    engineCc: 749,
    price: 29900,
    negotiable: true,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Streetfighter com motor 4 cilindros. Moto revisada, pneus com 80% de vida e pronta para viajar.",
    features: ["ABS", "4 cilindros", "Guidão esportivo"],
    images: [
      img("photo-1558981403-c5f9899a28bc"),
      img("photo-1558981806-ec527fa84c39"),
    ],
    status: "active",
    views: 98,
    favorites: 7,
    leads: 2,
    singleOwner: true,
    abs: true,
    featured: true,
  },
  {
    id: "pcx-2024",
    slug: "honda-pcx-160-2024",
    brand: "Honda",
    model: "PCX 160",
    year: 2024,
    manufacturingYear: 2024,
    mileage: 900,
    color: "Branca",
    fuelType: "Flex",
    transmission: "Automático",
    engineCc: 157,
    price: 18900,
    negotiable: false,
    acceptTrade: false,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Scooter seminova, praticamente zero. Baixo consumo, baú incluso e ideal para o dia a dia na cidade.",
    features: ["ABS", "Start-stop", "Baú", "USB", "Keyless"],
    images: [
      img("photo-1591637333184-19aa84b3e01f"),
      img("photo-1558981806-ec527fa84c39"),
    ],
    status: "active",
    views: 312,
    favorites: 21,
    leads: 11,
    singleOwner: true,
    abs: true,
    featured: false,
  },
  {
    id: "lander-2022",
    slug: "yamaha-lander-250-2022",
    brand: "Yamaha",
    model: "Lander 250",
    year: 2022,
    manufacturingYear: 2022,
    mileage: 14500,
    color: "Azul",
    fuelType: "Flex",
    transmission: "Manual",
    engineCc: 249,
    price: 22900,
    negotiable: true,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Trail versátil para cidade e estrada de terra. Relação nova e amortecedor em ótimo estado.",
    features: ["ABS", "Guidão alto", "Protetor de carenagem"],
    images: [
      img("photo-1615172282427-9a57ef2d142e"),
      img("photo-1568772585407-9361f9bf3a87"),
    ],
    status: "active",
    views: 141,
    favorites: 6,
    leads: 4,
    singleOwner: true,
    abs: true,
    featured: false,
  },
  {
    id: "n300-2023",
    slug: "kawasaki-ninja-300-2023",
    brand: "Kawasaki",
    model: "Ninja 300",
    year: 2023,
    manufacturingYear: 2023,
    mileage: 4300,
    color: "Verde",
    fuelType: "Gasolina",
    transmission: "Manual",
    engineCc: 296,
    price: 27900,
    negotiable: true,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Esportiva leve, perfeita para quem está saindo da cilindrada baixa. Carenagem original sem arranhões.",
    features: ["ABS", "Carenagem completa", "Painel digital"],
    images: [
      img("photo-1558981359-3495844d1e1c"),
      img("photo-1609630875171-b1321377ee65"),
    ],
    status: "paused",
    views: 77,
    favorites: 4,
    leads: 1,
    singleOwner: true,
    abs: true,
    featured: false,
  },
  {
    id: "cg160-2021",
    slug: "honda-cg-160-fan-2021",
    brand: "Honda",
    model: "CG 160 Fan",
    year: 2021,
    manufacturingYear: 2021,
    mileage: 28000,
    color: "Vermelha",
    fuelType: "Flex",
    transmission: "Manual",
    engineCc: 162,
    price: 12900,
    negotiable: true,
    acceptTrade: true,
    city: "Presidente Prudente",
    state: "SP",
    description:
      "Trabalho e economia. Moto honestamente usada, partida elétrica e documentação ok. Ótima para o primeiro veículo.",
    features: ["Partida elétrica", "Protetor de carenagem"],
    images: [
      img("photo-1591637333184-19aa84b3e01f"),
      img("photo-1591637333184-19aa84b3e01f"),
    ],
    status: "sold",
    views: 410,
    favorites: 15,
    leads: 9,
    singleOwner: false,
    abs: false,
    featured: false,
  },
];

export const leads: Lead[] = [
  {
    id: "L-1042",
    name: "João Mendes",
    phone: "(18) 98811-2200",
    email: "joao.mendes@email.com",
    bikeId: "cb500x-2022",
    message: "Aceita CG 160 na troca? Consigo ir sábado.",
    status: "negociacao",
    createdAt: "2026-09-18T14:20:00",
  },
  {
    id: "L-1041",
    name: "Ana Paula",
    phone: "(18) 99712-3344",
    email: "ana.paula@email.com",
    bikeId: "pcx-2024",
    message: "A PCX ainda está disponível? Quero financiar.",
    status: "novo",
    createdAt: "2026-09-19T09:05:00",
  },
  {
    id: "L-1038",
    name: "Ricardo Alves",
    phone: "(18) 97655-0911",
    email: "ricardo.alves@email.com",
    bikeId: "mt07-2023",
    message: "Pode enviar mais fotos da lateral e do painel?",
    status: "contactado",
    createdAt: "2026-09-17T11:40:00",
  },
  {
    id: "L-1033",
    name: "Camila Souza",
    phone: "(18) 98100-4422",
    email: "camila.souza@email.com",
    bikeId: "gsx-s750-2020",
    message: "Fechei a Suzuki. Obrigada pelo atendimento!",
    status: "fechado",
    createdAt: "2026-09-12T16:10:00",
  },
  {
    id: "L-1029",
    name: "Pedro Lima",
    phone: "(18) 99222-1100",
    email: "pedro.lima@email.com",
    bikeId: "z400-2021",
    message: "Comprei em outra loja, valeu.",
    status: "perdido",
    createdAt: "2026-09-10T10:00:00",
  },
];

export const posts: BlogPost[] = [
  {
    slug: "como-escolher-primeira-moto",
    title: "Como escolher a primeira moto sem errar",
    excerpt: "Cilindrada, ABS, custo de manutenção e o que olhar na documentação antes de fechar.",
    date: "12 de setembro de 2026",
    readMinutes: 6,
  },
  {
    slug: "financiamento-de-motos",
    title: "Financiamento de motos: o que a loja pode facilitar",
    excerpt: "Entrada, prazos e dicas para o cliente chegar qualificado — sem surpresa na hora da análise.",
    date: "4 de setembro de 2026",
    readMinutes: 5,
  },
  {
    slug: "revisao-antes-de-viajar",
    title: "Checklist de revisão antes de viajar no fim de semana",
    excerpt: "Pneus, relação, freios e o que conferir em 20 minutos no pátio da Apex Motos.",
    date: "28 de agosto de 2026",
    readMinutes: 4,
  },
];

export const brands = ["Honda", "Yamaha", "Kawasaki", "Suzuki"] as const;

export function getBike(idOrSlug: string) {
  return bikes.find((bike) => bike.id === idOrSlug || bike.slug === idOrSlug);
}

export function getActiveBikes() {
  return bikes.filter((bike) => bike.status === "active");
}

export function getFeaturedBikes() {
  return bikes.filter((bike) => bike.featured && bike.status === "active");
}

export function getLead(id: string) {
  return leads.find((lead) => lead.id === id);
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export const leadStatusLabel: Record<LeadStatus, string> = {
  novo: "Novo",
  contactado: "Contactado",
  negociacao: "Em negociação",
  fechado: "Fechado",
  perdido: "Perdido",
};

export const bikeStatusLabel: Record<BikeStatus, string> = {
  active: "Ativa",
  paused: "Pausada",
  sold: "Vendida",
};
