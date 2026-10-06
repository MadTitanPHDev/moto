---
name: crm-frontend
description: >-
  Implementa a interface Next.js do site da revenda e do painel CRM: páginas,
  formulários e componentes. Use ao criar ou alterar web/src/app, web/src/components
  ou o visual do catálogo, funil, ficha e tarefas.
---

# Frontend do CRM

Leia `.cursor/skills/crm-ux/SKILL.md` quando a mudança alterar texto, fluxo ou layout. Leia `.cursor/skills/crm-security/SKILL.md` em formulário público ou tela sob login.

## Rotas

| Quem | Onde |
|---|---|
| Visitante | `web/src/app/(site)/` : home, catálogo, moto, sobre, contato, blog |
| Administrador | `web/src/app/admin/` : login, painel, funil, interesses, pessoas, tarefas, motos, configurações |

O visitante não vê funil, telefone de outro cliente nem controle de estoque.

## Como ligar na regra de negócio

- Formulário envia para server action em `web/src/server/`.
- O componente não decide estágio, deduplicação nem se a moto sai do ar.
- Estado de carregamento e erro vêm da resposta da action.
- Dado de demonstração em `web/src/lib/data.ts` só permanece enquanto a tela ainda for protótipo. Tela definitiva lê o banco.

## Padrão visual já usado

- Site: fundo branco, título em extra-bold, botão em pílula escura, destaque creme.
- Painel: fundo cinza claro, cartão branco, `rounded-2xl`.
- Reutilize `StageBadge`, `AdminShell`, `SiteHeader` e `BikeCard` antes de criar outro bloco igual.
- Alvo de toque com pelo menos 44 px. Rótulo no campo, não só placeholder.

## Formulários

- Interesse na moto: nome, telefone, e-mail, mensagem. A moto já vai no pedido.
- Contato geral: os mesmos campos, sem moto.
- Confirmação depois do envio, em português, sem dizer que a venda está fechada.
- Botão desabilitado enquanto envia.

## Ao terminar

Abra a rota alterada. Confira o estado vazio, o erro de validação e o uso no celular quando o layout mudou.
