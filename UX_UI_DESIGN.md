# UX/UI Design Guide
## Marketplace de Veículos

---

## 1. Princípios de Design

### 1.1 Valores Fundamentais

#### Confiança
- **Visual limpo e profissional**
- **Transparência de informações**
- **Reputação visível**
- **Dados verificados**

#### Simplicidade
- **Navegação intuitiva**
- **Processos guiados**
- **Menos cliques, mais resultados**
- **Informação hierarquizada**

#### Eficiência
- **Busca rápida e precisa**
- **Carregamento otimizado**
- **Feedback imediato**
- **Atalhos e salvamentos**

---

## 2. Design System

### 2.1 Paleta de Cores

```css
/* Cores Primárias */
--primary-50: #EFF6FF;
--primary-100: #DBEAFE;
--primary-500: #3B82F6;  /* Azul principal - confiança */
--primary-600: #2563EB;
--primary-700: #1D4ED8;

/* Cores Neutras */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-300: #D1D5DB;
--gray-500: #6B7280;
--gray-700: #374151;
--gray-900: #111827;

/* Cores de Feedback */
--success: #10B981;  /* Verde - ação completada */
--warning: #F59E0B;  /* Amarelo - atenção */
--error: #EF4444;    /* Vermelho - erro */
--info: #3B82F6;     /* Azul - informação */

/* Cores de Overlay */
--overlay-dark: rgba(0, 0, 0, 0.6);
--overlay-light: rgba(255, 255, 255, 0.9);
```

**Justificativa**:
- Azul transmite confiança e profissionalismo
- Neutros permitem destaque do conteúdo (fotos dos veículos)
- Feedbacks claros para estados de interação

### 2.2 Tipografia

```css
/* Font Families */
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;

/* Heading Scale (Modular 1.25) */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */

/* Font Weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

**Justificativa**:
- Inter é legível, moderna e open-source
- Escala modular garante hierarquia visual consistente

### 2.3 Espaçamento (8pt Grid)

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### 2.4 Componentes Base

#### Button

```
┌─────────────────────────────┐
│ Estado     │ Estilo          │
├─────────────────────────────┤
│ Primary    │ Azul sólido     │
│ Secondary  │ Cinza contorno  │
│ Ghost      │ Transparente    │
│ Danger     │ Vermelho sólido │
├─────────────────────────────┤
│ Tamanhos   │ Altura          │
├─────────────────────────────┤
│ sm         │ 32px            │
│ md         │ 40px            │
│ lg         │ 48px            │
└─────────────────────────────┘
```

#### Card de Veículo

```
┌───────────────────────────────────────┐
│  ┌─────────────────────────────────┐  │
│  │                                 │  │
│  │        Imagem Principal         │  │
│  │          (16:9 ratio)           │  │
│  │                                 │  │
│  └─────────────────────────────────┘  │
│                                        │
│  R$ 45.900                      ♥️ 23  │
│  Honda Civic 2020                      │
│  2020 • 45.000 km • Automático         │
│                                        │
│  📍 São Paulo, SP                      │
└───────────────────────────────────────┘
     [Hover: Shadow + Scale 1.02]
```

---

## 3. Jornadas de Usuário Detalhadas

### 3.1 Jornada do Comprador

#### Persona: João, 32 anos
- **Objetivo**: Comprar um carro usado confiável até R$ 50.000
- **Contexto**: Busca durante horário de almoço no celular
- **Dores**: Medo de fraudes, dificuldade de comparar opções

#### Fluxo Completo

```
ETAPA 1: DESCOBERTA
┌─────────────────────────────────────────┐
│         Landing Page                    │
│  ┌───────────────────────────────────┐  │
│  │  🔍 O que você procura?           │  │
│  │  [  Carro  ] [  Moto  ]          │  │
│  │                                   │  │
│  │  Marca: [Todas ▼]  Ano: [▼]     │  │
│  │  Preço: [Até R$___]              │  │
│  │  Localização: [Sua cidade ▼]     │  │
│  │                                   │  │
│  │        [🔍 Buscar]                │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ✨ Destaques do dia                    │
│  [Card] [Card] [Card] [Card]           │
│                                         │
│  📊 Marcas mais buscadas                │
│  [Honda] [Toyota] [Volkswagen]         │
└─────────────────────────────────────────┘
         │
         │ [Clica em Buscar]
         ▼
ETAPA 2: EXPLORAÇÃO
┌─────────────────────────────────────────┐
│  Busca: "Honda" • "Até R$ 50k" • "SP" │
│  ────────────────────────────────────── │
│                                         │
│  [Filtros ☰]      Ordenar: [Recente ▼]│
│                                         │
│  124 resultados encontrados             │
│  ═══════════════════════════════════    │
│                                         │
│  ┌─────────────────────────┐            │
│  │ [Imagem]         ♥️     │            │
│  │ R$ 45.900              │            │
│  │ Honda Civic LXR 2020    │            │
│  │ 45.000 km • Automático  │            │
│  │ 📍 São Paulo - SP       │            │
│  └─────────────────────────┘            │
│                                         │
│  ┌─────────────────────────┐            │
│  │ [Imagem]         ♥️     │            │
│  │ R$ 38.500              │            │
│  │ Honda Fit EX 2018       │            │
│  │ 62.000 km • Automático  │            │
│  │ 📍 Guarulhos - SP       │            │
│  └─────────────────────────┘            │
│                                         │
│  [Carregar mais...]                     │
└─────────────────────────────────────────┘
         │
         │ [Abre Filtros Laterais]
         ▼
┌─────────────────────────────────────────┐
│  🔧 FILTROS                             │
│  ═══════════════════════════════════    │
│                                         │
│  Marca                                  │
│  ☑️ Honda (124)                         │
│  ☐ Toyota (89)                          │
│  ☐ Volkswagen (76)                      │
│                                         │
│  Ano                                    │
│  ┌────────────────────────┐             │
│  │ ◄═══●═══════► 2018-2024│             │
│  └────────────────────────┘             │
│                                         │
│  Preço                                  │
│  ┌────────────────────────┐             │
│  │ ◄══════●════► R$ 0-50k │             │
│  └────────────────────────┘             │
│                                         │
│  Quilometragem                          │
│  ☐ Até 30.000 km                        │
│  ☑️ Até 50.000 km                       │
│  ☐ Até 100.000 km                       │
│                                         │
│  Câmbio                                 │
│  ☐ Manual                               │
│  ☑️ Automático                          │
│                                         │
│  [Aplicar Filtros]                      │
└─────────────────────────────────────────┘
         │
         │ [Clica em Card]
         ▼
ETAPA 3: AVALIAÇÃO
┌─────────────────────────────────────────┐
│  ← Voltar      Honda Civic LXR 2020     │
│  ═══════════════════════════════════    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  [==== Galeria de Fotos ====]  │    │
│  │  [  Foto Principal  ]          │    │
│  │  [ < ] ●●●○○○○○○○ [ > ]       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  R$ 45.900          [♥️ Favoritar]     │
│  ════════════       [🔗 Compartilhar]  │
│                                         │
│  📋 INFORMAÇÕES BÁSICAS                 │
│  • Marca: Honda                         │
│  • Modelo: Civic LXR                    │
│  • Ano: 2020/2020                       │
│  • Quilometragem: 45.000 km             │
│  • Cor: Prata                           │
│  • Combustível: Flex                    │
│  • Câmbio: Automático (CVT)             │
│  • Portas: 4                            │
│  • Único dono: Sim                      │
│  • IPVA 2024: Pago                      │
│                                         │
│  ✨ OPCIONAIS                           │
│  ✓ Ar-condicionado Digital              │
│  ✓ Direção Elétrica                     │
│  ✓ Vidros Elétricos                     │
│  ✓ Trava Elétrica                       │
│  ✓ Sensor de Ré                         │
│  ✓ Câmera de Ré                         │
│  ✓ Central Multimídia                   │
│  ✓ Bancos de Couro                      │
│                                         │
│  📝 DESCRIÇÃO                           │
│  Carro em excelente estado de           │
│  conservação. Todas as revisões          │
│  feitas na concessionária. Manual        │
│  e chave reserva. Aceito propostas.      │
│                                         │
│  📍 LOCALIZAÇÃO                         │
│  [Mapa] São Paulo - SP                  │
│  CEP: 04xxx-xxx                         │
│                                         │
│  ═══════════════════════════════════    │
│                                         │
│  👤 VENDEDOR                            │
│  ┌─────────────────────────────────┐    │
│  │ [Foto] Carlos Silva            │    │
│  │ ⭐⭐⭐⭐⭐ 4.8 (24 avaliações)  │    │
│  │ 🚗 3 veículos anunciados       │    │
│  │ ✅ Conta verificada            │    │
│  │                                │    │
│  │ [💬 Enviar Mensagem]           │    │
│  │ [📞 Ver Telefone]              │    │
│  └─────────────────────────────────┘    │
│                                         │
│  🔐 SEGURANÇA                           │
│  ✓ Vendedor verificado                  │
│  ✓ Documento conferido                  │
│  ⚠️ Nunca envie dinheiro antes de ver   │
│                                         │
│  ═══════════════════════════════════    │
│                                         │
│  🚗 VEÍCULOS SIMILARES                  │
│  [Card] [Card] [Card]                   │
└─────────────────────────────────────────┘
         │
         │ [Clica em Enviar Mensagem]
         ▼
ETAPA 4: CONTATO
┌─────────────────────────────────────────┐
│  💬 Conversa com Carlos Silva           │
│  ═══════════════════════════════════    │
│  Sobre: Honda Civic LXR 2020            │
│  ────────────────────────────────────── │
│                                         │
│  Carlos (Hoje, 12:34)                   │
│  ┌───────────────────────────┐          │
│  │ Olá! Obrigado pelo        │          │
│  │ interesse. Como posso     │          │
│  │ ajudar?                   │          │
│  └───────────────────────────┘          │
│                                         │
│              Você (Hoje, 12:35)         │
│          ┌───────────────────────────┐  │
│          │ Oi! O carro está em      │  │
│          │ perfeito estado? Posso   │  │
│          │ fazer um test drive?     │  │
│          └───────────────────────────┘  │
│                                         │
│  [Respostas Rápidas]                    │
│  [Qual o último preço?]                 │
│  [Aceita troca?]                        │
│  [Posso visitar quando?]                │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Digite sua mensagem...         │    │
│  │                          [📎][😊] │    │
│  └─────────────────────────────────┘    │
│                          [Enviar ➤]    │
│                                         │
│  💰 Fazer Proposta                      │
│  [R$ ______] [Enviar Proposta]         │
└─────────────────────────────────────────┘
```

**Insights de UX**:
1. **Busca em destaque**: Principal ação na home
2. **Filtros visuais**: Sliders são mais intuitivos que inputs
3. **Galeria ampliada**: Fotos são decisivas em compra de veículo
4. **Reputação visível**: Aumenta confiança
5. **Chat contextual**: Sobre o veículo específico
6. **Respostas rápidas**: Acelera conversação

---

### 3.2 Jornada do Vendedor

#### Persona: Maria, 38 anos, Concessionária
- **Objetivo**: Anunciar 15 carros do estoque
- **Contexto**: Desktop no escritório
- **Dores**: Processo demorado, fotos ruins diminuem visibilidade

#### Fluxo de Criação de Anúncio

```
ETAPA 1: INÍCIO
┌─────────────────────────────────────────┐
│  Dashboard do Vendedor                  │
│  ═══════════════════════════════════    │
│                                         │
│  📊 RESUMO                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │  15  │ │ 234  │ │  47  │ │  12  │   │
│  │Ativos│ │Views │ │Favs. │ │Msgs. │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
│                                         │
│  [+ Novo Anúncio]                       │
│  ═══════════════════════════════════    │
│                                         │
│  📱 MEUS ANÚNCIOS                       │
│  ┌─────────────────────────────────┐    │
│  │ [Img] Honda Civic 2020         │    │
│  │ R$ 45.900 • Ativo              │    │
│  │ 👁️ 234 • ♥️ 47 • 💬 12         │    │
│  │ [Editar] [Pausar] [Estatísticas] │    │
│  └─────────────────────────────────┘    │
│  ...                                    │
└─────────────────────────────────────────┘
         │
         │ [Clica em + Novo Anúncio]
         ▼
ETAPA 2: WIZARD - PASSO 1/5
┌─────────────────────────────────────────┐
│  Criar Anúncio          [●○○○○] 1 de 5  │
│  ═══════════════════════════════════    │
│                                         │
│  Que tipo de veículo você está          │
│  anunciando?                            │
│                                         │
│  ┌───────────────┐  ┌───────────────┐   │
│  │     🚗        │  │     🏍️        │   │
│  │               │  │               │   │
│  │    CARRO      │  │     MOTO      │   │
│  │               │  │               │   │
│  └───────────────┘  └───────────────┘   │
│                                         │
│              [Continuar →]              │
└─────────────────────────────────────────┘
         │
         │ [Seleciona Carro]
         ▼
ETAPA 3: WIZARD - PASSO 2/5
┌─────────────────────────────────────────┐
│  Informações Básicas  [●●○○○] 2 de 5    │
│  ═══════════════════════════════════    │
│                                         │
│  Marca *                                │
│  [Honda               ▼]                │
│                                         │
│  Modelo *                               │
│  [Civic               ▼]                │
│                                         │
│  Versão                                 │
│  [LXR 2.0 FlexOne     ▼]                │
│                                         │
│  Ano do Modelo *    Ano de Fabricação * │
│  [2020         ▼]   [2020           ▼]  │
│                                         │
│  Quilometragem (km) *                   │
│  [45000                ]                │
│                                         │
│  Cor *                                  │
│  ○ Branco  ○ Preto  ●Prata  ○ Vermelho │
│  ○ Azul    ○ Cinza  ○ Verde  ○ Outro   │
│                                         │
│  [← Voltar]            [Continuar →]    │
└─────────────────────────────────────────┘
         │
         ▼
ETAPA 4: WIZARD - PASSO 3/5
┌─────────────────────────────────────────┐
│  Especificações      [●●●○○] 3 de 5     │
│  ═══════════════════════════════════    │
│                                         │
│  Tipo de Combustível *                  │
│  ○ Gasolina  ●Flex  ○ Diesel  ○ Elétrico│
│                                         │
│  Câmbio *                               │
│  ○ Manual  ●Automático  ○ Automatizado  │
│                                         │
│  Número de Portas *                     │
│  ○ 2 portas  ●4 portas                  │
│                                         │
│  Motor (cilindradas)                    │
│  [2.0                ]                  │
│                                         │
│  🔧 OPCIONAIS                           │
│  ☑️ Ar-condicionado    ☑️ Direção hidráulica│
│  ☑️ Vidros elétricos   ☑️ Trava elétrica    │
│  ☑️ Airbag             ☑️ ABS              │
│  ☑️ Sensor de ré       ☑️ Câmera de ré     │
│  ☑️ Bancos de couro    ☐ Teto solar       │
│  ☐ Rodas de liga      ☑️ Central multimídia│
│                                         │
│  📋 DOCUMENTAÇÃO                        │
│  ☑️ IPVA pago          ☑️ Licenciado       │
│  ☑️ Único dono         ☐ Aceita troca      │
│                                         │
│  [← Voltar]            [Continuar →]    │
└─────────────────────────────────────────┘
         │
         ▼
ETAPA 5: WIZARD - PASSO 4/5
┌─────────────────────────────────────────┐
│  Fotos e Mídia       [●●●●○] 4 de 5     │
│  ═══════════════════════════════════    │
│                                         │
│  📸 Dica: Fotos de qualidade aumentam   │
│  suas chances de venda em até 80%!      │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ Arraste fotos ou clique para enviar ││
│  │                                     ││
│  │        📤 ADICIONAR FOTOS           ││
│  │                                     ││
│  │  (Até 30 fotos • Max 10MB cada)    ││
│  └─────────────────────────────────────┘│
│                                         │
│  FOTOS ENVIADAS (8/30)                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  │[1] │ │[2] │ │[3] │ │[4] │ [PRINCIPAL]│
│  │ ⭐ │ │    │ │    │ │    │            │
│  └────┘ └────┘ └────┘ └────┘            │
│  [X][↑][↓] [X][↑][↓] [X][↑][↓] [X][↑][↓]│
│                                         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  │[5] │ │[6] │ │[7] │ │[8] │            │
│  └────┘ └────┘ └────┘ └────┘            │
│                                         │
│  ✅ CHECKLIST DE FOTOS RECOMENDADAS:    │
│  ☑️ Frente                              │
│  ☑️ Traseira                            │
│  ☑️ Laterais (ambos lados)              │
│  ☑️ Painel                              │
│  ☑️ Bancos                              │
│  ☐ Motor                                │
│  ☐ Porta-malas                          │
│  ☐ Detalhes (rodas, pneus)              │
│                                         │
│  [← Voltar]            [Continuar →]    │
└─────────────────────────────────────────┘
         │
         ▼
ETAPA 6: WIZARD - PASSO 5/5
┌─────────────────────────────────────────┐
│  Preço e Descrição   [●●●●●] 5 de 5     │
│  ═══════════════════════════════════    │
│                                         │
│  💰 PREÇO *                             │
│  R$ [45900                    ]         │
│                                         │
│  ☑️ Aceito propostas                    │
│                                         │
│  💡 Sugestão de preço baseada no        │
│     mercado: R$ 43.000 - R$ 48.000      │
│                                         │
│  📝 DESCRIÇÃO *                         │
│  ┌─────────────────────────────────┐    │
│  │ Descreva o veículo...          │    │
│  │                                │    │
│  │ • Estado de conservação        │    │
│  │ • Histórico de manutenção      │    │
│  │ • Motivos da venda             │    │
│  │ • Diferenciais                 │    │
│  │                                │    │
│  │ (Min 50, Max 2000 caracteres)  │    │
│  └─────────────────────────────────┘    │
│  1245 / 2000                            │
│                                         │
│  📍 LOCALIZAÇÃO *                       │
│  Estado: [SP              ▼]            │
│  Cidade: [São Paulo       ▼]            │
│  CEP:    [04xxx-xxx          ]          │
│                                         │
│  ═══════════════════════════════════    │
│                                         │
│  [← Voltar]     [💾 Salvar Rascunho]    │
│                 [✅ Publicar Anúncio]   │
└─────────────────────────────────────────┘
         │
         │ [Clica em Publicar]
         ▼
ETAPA 7: CONFIRMAÇÃO
┌─────────────────────────────────────────┐
│  ✅ Anúncio Publicado com Sucesso!      │
│  ═══════════════════════════════════    │
│                                         │
│  🎉 Parabéns! Seu anúncio está no ar!   │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ [Foto] Honda Civic LXR 2020    │    │
│  │ R$ 45.900                      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  📊 O que acontece agora:               │
│  ✓ Seu anúncio está visível             │
│  ✓ Você receberá notificações           │
│  ✓ Compradores podem te contatar        │
│                                         │
│  💡 DICAS PARA VENDER MAIS RÁPIDO:      │
│  • Responda mensagens rapidamente       │
│  • Mantenha fotos de qualidade          │
│  • Atualize o preço se necessário       │
│  • Compartilhe nas redes sociais        │
│                                         │
│  [Ver Anúncio]  [Criar Outro]  [Dashboard]│
└─────────────────────────────────────────┘
```

**Insights de UX**:
1. **Wizard guiado**: Reduz carga cognitiva
2. **Progresso visível**: Usuário sabe onde está
3. **Salvamento automático**: Evita perda de dados
4. **Sugestões contextuais**: Preço, checklist de fotos
5. **Preview antes de publicar**: Reduz erros
6. **Feedback pós-publicação**: Próximos passos claros

---

## 4. Wireframes de Telas Principais

### 4.1 Home Page (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo]    Comprar    Vender    Ajuda       [👤 Login] [Cadastro]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│              ENCONTRE O VEÍCULO DOS SEUS SONHOS                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔍 Digite marca, modelo ou palavra-chave                  │  │
│  │                                                           │  │
│  │ Tipo: [Carro ▼]  Marca: [Todas ▼]  Ano: [2020-2024 ▼]  │  │
│  │ Preço: [Até R$___]  Local: [📍 São Paulo ▼]             │  │
│  │                                                           │  │
│  │                      [🔍 BUSCAR]                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ✨ DESTAQUES DA SEMANA                           [Ver todos >] │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ [Imagem] │  │ [Imagem] │  │ [Imagem] │  │ [Imagem] │       │
│  │ R$ 45.900│  │ R$ 82.000│  │ R$ 38.500│  │ R$ 125.000│      │
│  │ Honda    │  │ Toyota   │  │ Honda    │  │ BMW      │       │
│  │ Civic    │  │ Corolla  │  │ Fit      │  │ X5       │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  🔥 MARCAS POPULARES                                            │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              │
│  │Honda│ │Toyota│ │ VW  │ │Fiat │ │Chev.│ │Ford │              │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘              │
├─────────────────────────────────────────────────────────────────┤
│  💬 O QUE DIZEM NOSSOS USUÁRIOS                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │"Vendi meu carro │  │"Comprei minha   │  │"Plataforma      ││
│  │ em 3 dias!"     │  │ primeira moto   │  │ confiável e     ││
│  │ ⭐⭐⭐⭐⭐      │  │ aqui. Ótima     │  │ fácil de usar." ││
│  │ - João Silva    │  │ experiência!"   │  │ ⭐⭐⭐⭐⭐     ││
│  └─────────────────┘  │ ⭐⭐⭐⭐⭐      │  │ - Ana Costa     ││
│                       │ - Pedro Santos  │  └─────────────────┘│
│                       └─────────────────┘                      │
├─────────────────────────────────────────────────────────────────┤
│ [Logo] © 2024 • Sobre • Termos • Privacidade • Contato         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Listagem de Veículos (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo]    Comprar    Vender    Ajuda              [👤 Meu Perfil]│
├─────────────────────────────────────────────────────────────────┤
│ 🔍 Honda Civic • R$ 40k-50k • São Paulo              [Editar ✏️]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌──────────────┐  ┌────────────────────────────────────────┐   │
│ │              │  │                                        │   │
│ │  🔧 FILTROS  │  │  124 veículos encontrados             │   │
│ │              │  │  Ordenar: [Mais recentes ▼]          │   │
│ │  Marca       │  │  ═════════════════════════════════    │   │
│ │  ☑️ Honda    │  │                                        │   │
│ │  ☐ Toyota    │  │  ┌───────────────────────────────┐    │   │
│ │  ☐ VW        │  │  │┌────────────┐ R$ 45.900   ♥️  │    │   │
│ │              │  │  ││ [Imagem]   │ Honda Civic 2020│    │   │
│ │  Preço       │  │  ││            │ 45.000 km       │    │   │
│ │  ◄═══●══►    │  │  │└────────────┘ Automático      │    │   │
│ │  R$ 40-50k   │  │  │               📍 São Paulo, SP│    │   │
│ │              │  │  └───────────────────────────────┘    │   │
│ │  Ano         │  │                                        │   │
│ │  ◄═══●══►    │  │  ┌───────────────────────────────┐    │   │
│ │  2018-2024   │  │  │┌────────────┐ R$ 48.200   ♥️  │    │   │
│ │              │  │  ││ [Imagem]   │ Honda Civic 2021│    │   │
│ │  KM          │  │  ││            │ 32.000 km       │    │   │
│ │  ☐ 0-30k     │  │  │└────────────┘ Automático      │    │   │
│ │  ☑️ 0-50k    │  │  │               📍 Campinas, SP │    │   │
│ │  ☐ 0-100k    │  │  └───────────────────────────────┘    │   │
│ │              │  │                                        │   │
│ │  Câmbio      │  │  ┌───────────────────────────────┐    │   │
│ │  ☐ Manual    │  │  │┌────────────┐ R$ 43.500   ♥️  │    │   │
│ │  ☑️ Auto.    │  │  ││ [Imagem]   │ Honda Civic 2019│    │   │
│ │              │  │  ││            │ 58.000 km       │    │   │
│ │ [Aplicar]    │  │  │└────────────┘ Automático      │    │   │
│ │              │  │  │               📍 São Paulo, SP│    │   │
│ └──────────────┘  │  └───────────────────────────────┘    │   │
│                   │                                        │   │
│                   │  [Carregar mais...]                    │   │
│                   └────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Página de Detalhes Mobile

```
┌──────────────────────────────┐
│ ←  Honda Civic 2020     ♥️ ⋮ │
├──────────────────────────────┤
│                              │
│ ┌──────────────────────────┐ │
│ │ [====== Galeria ======] │ │
│ │                          │ │
│ │     [Foto Principal]     │ │
│ │                          │ │
│ │    ●●●●○○○○○○ 4/10      │ │
│ └──────────────────────────┘ │
│                              │
│ R$ 45.900                    │
│ Honda Civic LXR 2020         │
│ ───────────────────────────  │
│ 2020 • 45.000 km • Flex      │
│ Automático • 4 portas        │
│                              │
│ ┌──────────────────────────┐ │
│ │ 💬 Enviar Mensagem       │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ 📞 Ver Telefone          │ │
│ └──────────────────────────┘ │
│                              │
│ ═══════════════════════════  │
│ 📋 INFORMAÇÕES               │
│                              │
│ Marca: Honda                 │
│ Modelo: Civic LXR            │
│ Ano: 2020/2020               │
│ KM: 45.000                   │
│ Cor: Prata                   │
│ Combustível: Flex            │
│ Câmbio: Automático           │
│ Único dono: Sim              │
│                              │
│ ═══════════════════════════  │
│ ✨ OPCIONAIS                 │
│                              │
│ ✓ Ar-condicionado Digital    │
│ ✓ Direção Elétrica           │
│ ✓ Vidros Elétricos           │
│ ✓ Câmera de Ré               │
│ [Ver todos (12)]             │
│                              │
│ ═══════════════════════════  │
│ 📝 DESCRIÇÃO                 │
│                              │
│ Carro em excelente estado    │
│ de conservação. Todas as     │
│ revisões feitas na           │
│ concessionária. Manual e...  │
│ [Ler mais]                   │
│                              │
│ ═══════════════════════════  │
│ 📍 LOCALIZAÇÃO               │
│                              │
│ [Mini Mapa]                  │
│ São Paulo - SP               │
│                              │
│ ═══════════════════════════  │
│ 👤 VENDEDOR                  │
│                              │
│ ┌──────────────────────────┐ │
│ │ [Foto] Carlos Silva      │ │
│ │ ⭐ 4.8 (24 avaliações)   │ │
│ │ ✅ Verificado            │ │
│ │ [Ver Perfil →]           │ │
│ └──────────────────────────┘ │
│                              │
│ 🚗 SIMILARES                 │
│ [Card][Card][Card]           │
│                              │
└──────────────────────────────┘
   [💬][📞] FIXO NO BOTTOM
```

---

## 5. Microinterações

### 5.1 Favoritar Veículo

```
Estado Normal:      Hover:           Click:           Favorito:
   ♡                 ♡                ♡                 ♥️
 [vazio]         [scale 1.1]     [scale 0.9]       [pulsar]
                                 [+confetti]
```

**Animação**:
```css
.favorite-button {
  transition: transform 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.1);
}

.favorite-button:active {
  transform: scale(0.9);
}

.favorite-button.favorited {
  animation: heartbeat 0.5s ease;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(1.1); }
}
```

### 5.2 Loading States

#### Skeleton Screen para Card de Veículo

```
┌───────────────────────────┐
│  ┌─────────────────────┐  │
│  │ [=== Shimmer ===]   │  │ < Gradiente animado
│  │                     │  │
│  └─────────────────────┘  │
│  ▓▓▓▓▓▓▓░░░              │  │ < Barra cinza animada
│  ▓▓▓▓▓▓▓▓▓▓░░            │  │
│  ▓▓▓░░░░░                │  │
└───────────────────────────┘
```

**CSS**:
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 2000px 100%;
  animation: shimmer 2s infinite;
}
```

### 5.3 Toast Notifications

```
┌─────────────────────────────────┐
│ ✅ Veículo favoritado!          │ < Success
│                         [X]     │
└─────────────────────────────────┘
  [Slide in from right, auto-dismiss 3s]

┌─────────────────────────────────┐
│ ⚠️ Por favor, faça login         │ < Warning
│                         [X]     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ❌ Erro ao enviar mensagem       │ < Error
│ [Tentar novamente]      [X]     │
└─────────────────────────────────┘
```

---

## 6. Responsividade

### 6.1 Breakpoints e Comportamentos

```
MOBILE (320px - 640px)
├─ Layout: 1 coluna
├─ Menu: Hamburger
├─ Cards: Full width
├─ Filtros: Bottom sheet
└─ Imagens: 100% width

TABLET (641px - 1024px)
├─ Layout: 2 colunas
├─ Menu: Híbrido
├─ Cards: 2 por linha
├─ Filtros: Sidebar colapsável
└─ Imagens: 50% width

DESKTOP (1025px+)
├─ Layout: 3-4 colunas
├─ Menu: Full navbar
├─ Cards: 3-4 por linha
├─ Filtros: Sidebar fixa
└─ Imagens: Grid otimizado
```

### 6.2 Touch Targets (Mobile)

```
TAMANHO MÍNIMO: 44x44px (Regra de ouro iOS/Android)

Botões Primários: 48px altura
Botões Secundários: 40px altura
Ícones clicáveis: 44x44px área tocável
Links em texto: 44px altura de linha
Inputs: 48px altura
```

---

## 7. Acessibilidade (WCAG 2.1 AA)

### 7.1 Contraste de Cores

```
Texto Grande (18pt+ ou 14pt bold):
- Razão mínima: 3:1
- Exemplo: #2563EB sobre #FFFFFF = 4.5:1 ✅

Texto Normal:
- Razão mínima: 4.5:1
- Exemplo: #374151 sobre #FFFFFF = 10.8:1 ✅

Elementos UI (botões, bordas):
- Razão mínima: 3:1
```

### 7.2 Navegação por Teclado

```
Tab Order Lógico:
1. Logo/Home
2. Menu principal
3. Busca
4. Conteúdo principal
5. Sidebar
6. Footer

Atalhos:
- Tab: Próximo elemento
- Shift+Tab: Elemento anterior
- Enter: Ativar botão/link
- Espaço: Toggle checkbox/radio
- Esc: Fechar modal
- Arrow keys: Navegação em carrosséis
```

### 7.3 ARIA Labels

```html
<!-- Botão de favoritar -->
<button aria-label="Adicionar Honda Civic 2020 aos favoritos">
  <HeartIcon />
</button>

<!-- Busca -->
<input 
  type="search" 
  aria-label="Buscar veículos por marca, modelo ou palavra-chave"
  placeholder="Ex: Honda Civic"
/>

<!-- Status de carregamento -->
<div 
  role="status" 
  aria-live="polite" 
  aria-busy="true"
>
  Carregando veículos...
</div>

<!-- Paginação -->
<nav aria-label="Paginação de resultados">
  <button aria-label="Página anterior">←</button>
  <button aria-current="page">1</button>
  <button aria-label="Ir para página 2">2</button>
  <button aria-label="Próxima página">→</button>
</nav>
```

---

## 8. Guia de Redação (UX Writing)

### 8.1 Tom de Voz

**Princípios**:
- ✅ Claro e direto
- ✅ Amigável mas profissional
- ✅ Encorajador
- ❌ Não corporativo demais
- ❌ Não informal demais

**Exemplos**:

```
❌ "A operação foi realizada com êxito"
✅ "Anúncio publicado com sucesso!"

❌ "Ocorreu um erro inesperado"
✅ "Algo deu errado. Por favor, tente novamente."

❌ "Clique aqui para prosseguir"
✅ "Continuar"

❌ "Seu cadastro foi efetivado"
✅ "Bem-vindo ao [Nome da Plataforma]!"
```

### 8.2 Mensagens de Erro

```
PRINCÍPIO: Explique o que aconteceu + Como resolver

❌ "Erro 400"
✅ "Preencha todos os campos obrigatórios"

❌ "Invalid input"
✅ "O ano deve estar entre 1990 e 2024"

❌ "Network error"
✅ "Sem conexão com a internet. Verifique sua rede e tente novamente."

❌ "Unauthorized"
✅ "Sua sessão expirou. Faça login novamente para continuar."
```

### 8.3 Call-to-Actions

```
SEJA ESPECÍFICO E ORIENTADO A AÇÃO:

❌ "Clique aqui"
✅ "Enviar mensagem"

❌ "OK"
✅ "Confirmar exclusão"

❌ "Submeter"
✅ "Publicar anúncio"

❌ "Ver mais"
✅ "Ver todos os 124 veículos"
```

---

## 9. Checklist de Qualidade UX

### Antes de Lançar

#### Performance
- [ ] Tempo de carregamento inicial < 2s
- [ ] First Contentful Paint < 1.5s
- [ ] Imagens otimizadas (WebP, lazy loading)
- [ ] Código minificado
- [ ] Cache configurado

#### Responsividade
- [ ] Testado em iPhone (Safari)
- [ ] Testado em Android (Chrome)
- [ ] Testado em tablet
- [ ] Testado em desktop (Chrome, Firefox, Safari)
- [ ] Breakpoints funcionando
- [ ] Touch targets > 44px

#### Acessibilidade
- [ ] Lighthouse Accessibility Score > 90
- [ ] Navegação por teclado funcional
- [ ] Screen reader testado
- [ ] Contraste de cores validado
- [ ] ARIA labels implementados
- [ ] Formulários com labels associados

#### Usabilidade
- [ ] Fluxo principal em < 3 cliques
- [ ] Feedback visual em todas ações
- [ ] Mensagens de erro claras
- [ ] Estados de loading implementados
- [ ] Ações destrutivas com confirmação
- [ ] Botões com estados disabled claros

#### Conteúdo
- [ ] Textos revisados (ortografia/gramática)
- [ ] Tons de voz consistentes
- [ ] Microcopy útil e contextual
- [ ] Imagens com alt text
- [ ] Placeholder text realistas

---

Este documento fornece diretrizes completas de UX/UI para garantir uma experiência de usuário excepcional em toda a plataforma.