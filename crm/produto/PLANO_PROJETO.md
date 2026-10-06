# Plano do projeto
## CRM da revenda + site de vitrine

Documento de origem: `PLANO_PROJETO.md` (raiz). O plano original é um marketplace de vários vendedores. Este plano é o sistema de **uma revenda**: o público vê o estoque, a equipe conduz a venda no CRM.

---

## 1. Visão geral

### 1.1 Objetivo
Entregar um site público da loja e um CRM em que cada interessado vira uma ficha com moto, estágio, histórico e próxima tarefa.

### 1.2 Quem usa

| Público | Onde entra | Conta |
|---|---|---|
| Visitante / comprador | Site | Sem cadastro |
| Vendedor | CRM | Login, vê a própria carteira e o estoque |
| Administrador | CRM | Login, vê tudo, cadastra equipe e dados da loja |

### 1.3 Proposta de valor
- Preço e ficha da moto visíveis sem pedir no WhatsApp
- Interesse do site cai no funil com moto, contato e mensagem
- A loja sabe quem está sem retorno
- Venda fechada atualiza o estoque que o site mostra

---

## 2. Requisitos

### 2.1 Site público

#### RF01 — Vitrine
- Home com motos em destaque
- Catálogo com busca e filtros: marca, ano, preço, quilometragem, cidade
- Página da moto: galeria, especificações, preço, aceita troca, descrição
- Motos com status ativo aparecem. Pausadas e vendidas ficam fora do catálogo
- Sobre, contato, blog e botão de WhatsApp

**Origem no plano antigo:** RF02 e RF03, reduzidos a um estoque só, sem anúncio de terceiros.

#### RF02 — Captação
- “Tenho interesse” na moto: nome, telefone, e-mail, mensagem
- Formulário de contato geral, sem moto obrigatória
- Gravação imediata no CRM
- Mensagem de confirmação na tela
- E-mail para a loja com o nome e a moto

**Origem no plano antigo:** RF04 (mensagens). No CRM o canal com o cliente continua no WhatsApp; o sistema guarda o pedido e o que a equipe registrou.

### 2.2 CRM

#### RF03 — Pessoas
- Cadastro com nome, telefone, e-mail e origem (`site`, `whatsapp`, `loja`, `indicacao`)
- Telefone é a chave prática de duplicidade: o mesmo número reaproveita a pessoa
- Lista e busca por nome ou telefone
- Uma pessoa pode ter vários interesses ao longo do tempo

#### RF04 — Interesses (o negócio)
- Cada interesse aponta para uma pessoa e, quando houver, para uma moto
- Campos: mensagem inicial, valor de referência, responsável, estágio, motivo de perda
- Estágios: `novo`, `contactado`, `negociacao`, `fechado`, `perdido`
- Mudança de estágio grava autor e data
- `fechado` marca a moto como vendida e registra a data da venda
- `perdido` exige motivo (preço, comprou em outro lugar, sem retorno, desistiu)
- Filtros: estágio, moto, responsável, período

#### RF05 — Atividades
- Tipos: ligação, WhatsApp, visita, nota
- Texto, data e autor
- Aparecem na ficha em ordem cronológica
- Registrar atividade de contato em um interesse `novo` sugere passar para `contactado`

#### RF06 — Tarefas
- Título, vencimento, responsável e interesse ligado
- Estados: aberta e concluída
- Painel lista as atrasadas e as de hoje
- Todo interesse `novo` nasce com a tarefa “Fazer o primeiro contato”

#### RF07 — Estoque no CRM
- Criar e editar moto: marca, modelo, ano, km, cor, combustível, câmbio, cilindrada, preço, negociável, aceita troca, cidade, descrição, opcionais, fotos
- Status: ativo, pausado, vendido
- Contador de visualizações da página pública
- A moto vendida permanece no histórico do interesse

#### RF08 — Equipe e configuração
- Login com e-mail e senha
- Papéis: `admin` e `vendedor`
- Vendedor altera interesses em que é responsável e registra atividades
- Admin cadastra usuários, edita dados da loja (nome, endereço, telefone, WhatsApp, redes, horário) e vê todos os interesses
- Exportar interesses em CSV

#### RF09 — Painel
- Motos ativas, visualizações, interesses abertos, vendas do mês
- Funil por estágio
- Tarefas atrasadas
- Motos com mais visualizações e mais interesses

### 2.3 Requisitos não funcionais

| ID | Requisito |
|---|---|
| RNF01 | Catálogo e página da moto respondem em menos de 2 s em 4G típico |
| RNF02 | HTTPS, senha com hash, sessão do painel, validação de entrada |
| RNF03 | Backup diário do PostgreSQL, retenção de 30 dias |
| RNF04 | Mobile-first no site; CRM utilizável no celular da loja |
| RNF05 | Textos do site e do CRM em português |
| RNF06 | Dados de contato tratados conforme a LGPD: a loja é a controladora, há canal para exclusão |

---

## 3. Arquitetura em uma frase

Um aplicativo Next.js. Rotas públicas leem motos ativas. Rotas `/admin` exigem sessão. Server Actions ou rotas de API gravam pessoa, interesse, atividade e tarefa no PostgreSQL. Detalhe em [../tecnico/ARQUITETURA_TECNICA.md](../tecnico/ARQUITETURA_TECNICA.md).

---

## 4. Modelagem

### Pessoa
```text
id, name, phone, email, source, notes, createdAt
phone normalizado (só dígitos) para busca e deduplicação
```

### Interesse
```text
id, personId, bikeId?, message, stage, lostReason?
ownerId (usuário da loja)
referencePrice
closedAt?, createdAt, updatedAt
```

### Atividade
```text
id, dealId, authorId, type (call | whatsapp | visit | note)
body, happenedAt
```

### Tarefa
```text
id, dealId, assigneeId, title, dueAt, doneAt?
```

### Moto
```text
id, slug, brand, model, version, year, manufacturingYear
mileage, color, fuelType, transmission, engineCc
price, negotiable, acceptTrade, city, state
description, features[], images[], status (active | paused | sold)
views, featured, singleOwner, abs, soldAt?
```

### Usuário da loja
```text
id, name, email, passwordHash, role (admin | seller), active
```

### Loja
```text
name, tagline, city, state, address, phone
whatsapp, email, instagram, hours, logoUrl
```

Índices: `person.phone`, `deal.stage`, `deal.ownerId`, `deal.bikeId`, `task.dueAt` onde `doneAt` é nulo, `bike.status`, `bike.slug`.

O schema Prisma correspondente está em [../tecnico/EXEMPLOS_CODIGO.md](../tecnico/EXEMPLOS_CODIGO.md).

---

## 5. Jornadas

### 5.1 Visitante
1. Abre a home e entra no catálogo.
2. Filtra e abre uma moto.
3. Envia interesse ou chama no WhatsApp.
4. Vê confirmação. Não cria senha.

### 5.2 Vendedor
1. Recebe o e-mail e abre a ficha.
2. Liga ou chama no WhatsApp e registra a atividade.
3. Move para Contactado ou Em negociação.
4. Cria tarefa de retorno.
5. Fecha (moto sai do site) ou marca Perdido com motivo.

### 5.3 Administrador
1. Publica motos e fotos.
2. Distribui responsáveis.
3. Olha o funil e as tarefas atrasadas.
4. Ajusta telefone, endereço e WhatsApp da loja.

---

## 6. Segurança

- Sessão httpOnly no `/admin`
- Papel conferido em toda gravação
- Rate limit no formulário público
- Uploads restritos a imagem e a usuário autenticado
- Log de mudança de estágio (autor, de, para, quando)
- Segredos só em variável de ambiente

---

## 7. Roadmap

### Fase 1 (semanas 1–8) — opera a loja
- Banco, auth, CRUD de motos, catálogo real
- Captação criando pessoa e interesse
- Lista, ficha, mudança de estágio, e-mail, CSV

### Fase 2 (semanas 9–14) — conduz a venda
- Atividades, tarefas, funil, papéis, venda fechando a moto
- Treinamento de duas sessões

### Fora desta entrega
- Vários vendedores anunciando (marketplace da raiz)
- Chat interno, avaliações, buscas salvas
- Planos, impulsionamento, API pública
- App nativo, financiamento, OLX

---

## 8. Equipe e custo de operação

Para a permuta de uma loja: um desenvolvedor full-stack, 12 a 16 semanas, reaproveitando o visual de `web/`.

Operação mensal estimada:
- Hospedagem do app: R$ 0 a R$ 80 (faixa inicial)
- PostgreSQL gerenciado: R$ 0 a R$ 100
- Fotos: poucos reais no início
- Domínio: cerca de R$ 40 por ano

---

## 9. KPIs

- Interesses do site gravados / interesses exibidos no funil = 100%
- Interesses Novo com tarefa de primeiro contato = 100%
- Interesses sem atividade há mais de 48 h (meta: cair semana a semana)
- Motos vendidas ainda ativas no site = 0
- Tempo até o primeiro registro de contato

---

## 10. Riscos

| Risco | Mitigação |
|---|---|
| CRM vira planilha paralela ao WhatsApp | Primeiro contato vira tarefa automática; treinamento usa o WhatsApp real da loja |
| Deduplicar mal o telefone | Normalizar DDI e dígitos antes de criar pessoa |
| Escopo de marketplace | Qualquer item da seção “fora desta entrega” vira aditivo |
| Foto pesada derruba a página | Redimensionar no upload e servir tamanho de card |

---

## 11. Próximos passos

1. Confirmar estágios e motivos de perda com a loja.
2. Separar 5 motos com foto para o primeiro conteúdo.
3. Seguir [../tecnico/GUIA_IMPLEMENTACAO.md](../tecnico/GUIA_IMPLEMENTACAO.md).

---

*Outubro de 2026. Versão CRM do plano de projeto.*
