# AGENTS.md

CRM da revenda de motos no app Next.js em `web/`. Site público sem conta. Login e senha só para administradores da loja.

A API e as regras de negócio ficam no servidor (`web/src/server/`). O navegador é cliente: páginas em `web/src/app/` e componentes em `web/src/components/`.

```text
Visitante -> rotas públicas -> server actions
Administrador -> /admin (sessão) -> server actions
server -> PostgreSQL (Prisma) / fotos / e-mail
```

Documentação de produto: `crm/`. Segurança: `crm/tecnico/SEGURANCA.md`. O planejamento de marketplace na raiz do repositório não é o escopo desta entrega.

## Antes de escrever código

Leia a skill da área e siga só ela:

| Área | Skill | Quando |
|---|---|---|
| Backend | `.cursor/skills/crm-backend/SKILL.md` | `web/src/server/`, Prisma, server actions, e-mail, upload |
| Frontend | `.cursor/skills/crm-frontend/SKILL.md` | páginas, componentes, formulários em `web/src` |
| Segurança | `.cursor/skills/crm-security/SKILL.md` | login, sessão, formulário público, PII, auditoria, CSV |
| UI/UX | `.cursor/skills/crm-ux/SKILL.md` | layout, copy, funil, ficha, celular |

Tarefa que cruza áreas: leia as skills envolvidas. Segurança entra sempre que houver sessão, dado de cliente ou formulário público.

Os arquivos `web/AGENTS.md` e `docs/AGENTS.md` são do Next.js. Não os substitua por este texto.

## Regras fixas

- Visitante não tem cadastro, login nem senha.
- Quem entra no painel é administrador da loja e vê a loja inteira. Não há papel de vendedor nesta entrega.
- Senha com hash. Sessão em cookie HttpOnly, Secure, SameSite=Strict.
- Validação no servidor. A do navegador só orienta o preenchimento.
- Telefone e e-mail de cliente não entram em log, URL, erro ou telemetria.
- Mudança de estágio, venda, exportação CSV, login e troca de senha geram auditoria.
- Moto e pessoa não são apagadas de verdade. Moto vendida sai do catálogo e fica no interesse.
- Erro de negócio devolve mensagem estável ao cliente e detalhe só no log do servidor.
- Segredo só em variável de ambiente.
- Texto de interface em português.
- Commit no formato `tipo(escopo): descrição no imperativo`.

## Fora desta entrega

Conta de cliente, OAuth, 2FA obrigatório, papel de vendedor com carteira separada, marketplace, chat interno, financiamento com API de banco, publicação em OLX.

## Verificação

Antes de encerrar uma alteração em `web/`:

```bash
cd web
npx tsc --noEmit
```

Se a mudança for de fluxo (interesse, estágio, venda, login), descreva o caso coberto e o resultado esperado. Não declare a tela pronta sem abrir a rota afetada.
