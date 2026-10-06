# CRM da revenda + site de vitrine

Planejamento do produto que a loja usa no dia a dia: um **CRM** para acompanhar cada interessado até a venda, com o **site público** como vitrine do estoque.

Os documentos originais do marketplace continuam na raiz do repositório. Esta pasta não os substitui.

| Documento de origem (raiz) | Versão CRM |
|---|---|
| `RESUMO_EXECUTIVO.md` | [produto/RESUMO_EXECUTIVO.md](./produto/RESUMO_EXECUTIVO.md) |
| `PLANO_PROJETO.md` | [produto/PLANO_PROJETO.md](./produto/PLANO_PROJETO.md) |
| `UX_UI_DESIGN.md` | [produto/UX_UI_DESIGN.md](./produto/UX_UI_DESIGN.md) |
| `ARQUITETURA_TECNICA.md` | [tecnico/ARQUITETURA_TECNICA.md](./tecnico/ARQUITETURA_TECNICA.md) |
| `GUIA_IMPLEMENTACAO.md` | [tecnico/GUIA_IMPLEMENTACAO.md](./tecnico/GUIA_IMPLEMENTACAO.md) |
| `EXEMPLOS_CODIGO.md` | [tecnico/EXEMPLOS_CODIGO.md](./tecnico/EXEMPLOS_CODIGO.md) |
| `START_HERE_PERMUTA.md` | [comercial/START_HERE_PERMUTA.md](./comercial/START_HERE_PERMUTA.md) |
| `PROPOSTA_COMERCIAL.md` | [comercial/PROPOSTA_COMERCIAL.md](./comercial/PROPOSTA_COMERCIAL.md) |
| `ESTRATEGIA_APRESENTACAO.md` | [comercial/ESTRATEGIA_APRESENTACAO.md](./comercial/ESTRATEGIA_APRESENTACAO.md) |
| `CONTRATO_PERMUTA_MODELO.md` | [comercial/CONTRATO_PERMUTA_MODELO.md](./comercial/CONTRATO_PERMUTA_MODELO.md) |

## O que este produto é

Uma revenda de motos ganha dois lados no mesmo sistema:

1. **Site para o cliente** — home, catálogo, página da moto, sobre, contato, blog e WhatsApp. O visitante vê preço, fotos e especificações e registra interesse.
2. **CRM para a loja** — pessoas, interesses ligados a uma moto, funil de venda, histórico de contatos, tarefas e estoque. Fechar a venda tira a moto do site.

O protótipo visual em `web/` (Apex Motos) continua como amostra de navegação. Estes documentos descrevem o sistema que grava dados de verdade.

## O que entra no CRM

- Pessoa (nome, telefone, e-mail, origem)
- Interesse ligado a uma moto, com valor e responsável
- Estágios: Novo, Contactado, Em negociação, Fechado, Perdido
- Histórico: ligação, WhatsApp, visita, nota
- Tarefas com data (“ligar amanhã”)
- Papéis: administrador e vendedor
- Painel com funil, tarefas atrasadas e motos mais vistas

## O que fica de fora desta versão

Marketplace com vários vendedores, chat interno, reputação, planos pagos, financiamento integrado e publicação automática em OLX. A conversa com o cliente segue no WhatsApp da loja; o CRM registra o que aconteceu.

## Stack desta versão

- **Aplicação**: Next.js (site público e CRM no mesmo projeto)
- **Banco**: PostgreSQL + Prisma
- **Auth do painel**: sessão com papéis
- **Arquivos**: armazenamento de fotos (S3 ou equivalente)
- **Avisos**: e-mail quando chega um interesse novo

## Como ler

1. [comercial/START_HERE_PERMUTA.md](./comercial/START_HERE_PERMUTA.md) se o objetivo é a troca por moto.
2. [produto/RESUMO_EXECUTIVO.md](./produto/RESUMO_EXECUTIVO.md) para a visão em poucos minutos.
3. [produto/PLANO_PROJETO.md](./produto/PLANO_PROJETO.md) para escopo, dados e roadmap.
4. [tecnico/GUIA_IMPLEMENTACAO.md](./tecnico/GUIA_IMPLEMENTACAO.md) para construir.

*Versão CRM: outubro de 2026. Baseada nos planejamentos da raiz, reescrita para revenda com CRM.*
