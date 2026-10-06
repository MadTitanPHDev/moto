---
name: crm-ux
description: >-
  Define UX e UI do site da revenda e do CRM: jornada do visitante, funil,
  ficha, tarefas e textos em português. Use ao desenhar ou ajustar telas,
  mensagens, estados vazios e fluxos de interesse ou venda.
---

# UX do CRM

Referência de produto: `crm/produto/UX_UI_DESIGN.md`. O visual de partida é o protótipo Apex Motos em `web/`.

## Duas jornadas

**Visitante.** Acha a moto, vê preço, ano e km, e pede contato ou chama no WhatsApp. Não cria conta e não vê o funil.

**Administrador.** Abre o painel, vê tarefa atrasada, registra o contato e move o estágio. Fechar a venda tira a moto do catálogo. Perder pede o motivo.

## Uma ação principal por tela

| Tela | Ação |
|---|---|
| Página da moto | Tenho interesse |
| Lista de interesses | Abrir ficha |
| Ficha | Registrar contato |
| Painel | Abrir a tarefa de hoje |
| Estoque | Adicionar moto |

## Texto

- Português direto: "Interessados", "Fazer o primeiro contato", "Marcar como vendida".
- Confirmação do visitante: "Recebemos seu interesse. A loja vai falar com você."
- Erro de telefone: "Informe o telefone com DDD."
- Venda: "Moto marcada como vendida e removida do catálogo."
- Perda sem motivo: "Escolha por que este interesse foi perdido."

Estágio aparece com texto, não só com cor.

## Celular

O administrador atende na loja. Lista de interesses vira cartão em tela estreita. Telefone da ficha disca. WhatsApp abre com o nome da moto na mensagem.

## O que não colocar na interface

Login de cliente, escolha de papel, carteira de vendedor, "demo" ou "salvar status (demo)" em tela que já grava de verdade.

## Ao terminar

Confira estado vazio, erro e o caminho visitante até a ficha do administrador.
