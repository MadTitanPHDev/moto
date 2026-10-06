---
name: crm-backend
description: >-
  Implementa o backend do CRM da revenda em Next.js e Prisma: motos, pessoas,
  interesses, tarefas, e-mail e upload. Use ao criar ou alterar server actions,
  web/src/server, schema Prisma, migrations ou regras de negócio do funil.
---

# Backend do CRM

Leia `crm/tecnico/SEGURANCA.md` se a mudança grava dado de cliente, sessão ou arquivo.

## Onde o código fica

```text
web/prisma/schema.prisma
web/src/server/db.ts
web/src/server/bikes.ts
web/src/server/people.ts
web/src/server/deals.ts
web/src/server/tasks.ts
web/src/server/activities.ts
web/src/server/auth.ts
web/src/server/mail.ts
```

Página em `web/src/app/` chama função de `web/src/server/`. Não coloque regra de funil dentro do componente.

## Modelo desta entrega

- Visitante cria pessoa e interesse. Não cria usuário.
- Usuário do painel é administrador. Todos os administradores veem motos, pessoas, interesses e tarefas da loja.
- `ownerId` no interesse registra quem conduz o retorno. Não esconde o registro dos outros administradores.
- Estágios: `NEW`, `CONTACTED`, `NEGOTIATION`, `WON`, `LOST`.
- `LOST` exige motivo. `WON` marca a moto `SOLD` na mesma transação.
- Telefone da pessoa é único, só dígitos, com DDI 55 quando faltar.
- Interesse novo cria a tarefa "Fazer o primeiro contato".

## Regras de escrita

- Falha de negócio retorna um resultado (`ok` ou `error` com código estável). Não use exceção para "telefone inválido" ou "motivo ausente".
- Não use `Date.now()` espalhado. Passe o instante a partir de um único helper se o teste precisar fixar o dia.
- Query com parâmetro do Prisma. Sem SQL concatenado.
- E-mail de aviso sai depois do commit. Falha de e-mail não desfaz o interesse.
- Upload só de JPEG, PNG ou WebP, com tamanho máximo, gravado pelo servidor.

## Ao terminar

- Migration com nome que diz o que mudou no domínio.
- Caso de teste ou roteiro manual do fluxo alterado: interesse novo, segundo interesse com o mesmo telefone, perda sem motivo, venda tirando a moto do catálogo.
