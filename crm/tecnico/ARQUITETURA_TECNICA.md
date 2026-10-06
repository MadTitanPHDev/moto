# Arquitetura técnica
## CRM da revenda + site de vitrine

Documento de origem: `ARQUITETURA_TECNICA.md` (raiz). A arquitetura original separa vários serviços (auth, veículos, mensagens, busca) atrás de um API gateway. Esta versão é **um aplicativo Next.js** com PostgreSQL, porque há uma loja, um estoque e uma equipe pequena.

---

## 1. Visão

```text
Visitante                         Equipe da loja
   │                                    │
   ▼                                    ▼
Site público (/)                    CRM (/admin)
catálogo, moto, contato            funil, ficha, estoque
   │                                    │
   └──────────────┬─────────────────────┘
                  ▼
           Next.js (App Router)
           Server Actions / route handlers
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 PostgreSQL     Fotos      E-mail
 (Prisma)     (S3 ou R2)   (SMTP)
```

O protótipo em `web/` já tem as rotas públicas e o esqueleto do admin. A construção troca `web/src/lib/data.ts` por consultas ao banco e adiciona as entidades de CRM.

---

## 2. Módulos

| Módulo | Responsabilidade |
|---|---|
| `site` | Páginas públicas, filtros, contagem de views |
| `capture` | Formulários de interesse e contato, deduplicação por telefone, e-mail à loja |
| `crm` | Pessoas, interesses, estágios, atividades, tarefas |
| `inventory` | CRUD de motos, upload, status ativo / pausado / vendido |
| `auth` | Login, sessão, papéis `admin` e `seller` |
| `settings` | Dados da loja usados no site e no WhatsApp |

Não há serviço de chat, de avaliação nem de anúncio de terceiros.

---

## 3. Pastas sugeridas

Partindo de `web/`:

```text
web/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (site)/                 # home, catálogo, moto, sobre, contato, blog
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   └── (panel)/
│   │   │       ├── page.tsx        # painel
│   │   │       ├── motos/
│   │   │       ├── interesses/     # substitui a lista estática de leads
│   │   │       ├── pessoas/
│   │   │       ├── tarefas/
│   │   │       └── configuracoes/
│   │   └── api/upload/             # upload autenticado, se não for server action
│   ├── server/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── deals.ts
│   │   ├── people.ts
│   │   ├── bikes.ts
│   │   ├── tasks.ts
│   │   ├── activities.ts
│   │   └── mail.ts
│   └── components/                 # os atuais + ficha, funil, timeline
└── .env.example
```

A pasta `docs/` e os markdowns da raiz permanecem. Esta arquitetura não os altera.

---

## 4. Fluxos

### 4.1 Interesse no site
1. Visitante envia nome, telefone, e-mail e mensagem, com `bikeId` quando veio da moto.
2. Servidor valida, normaliza o telefone e aplica rate limit por IP.
3. Busca pessoa pelo telefone. Cria se não existir.
4. Cria interesse em `novo`, com a mensagem e o preço da moto como valor de referência.
5. Cria tarefa “Fazer o primeiro contato”, vencendo no próximo dia útil, para o admin padrão ou para o vendedor da vez.
6. Envia e-mail à loja.
7. Responde sucesso ao modal.

Falha de e-mail não desfaz o interesse. O registro no banco é a fonte. O e-mail é aviso.

### 4.2 Mudança de estágio
1. Sessão válida e permissão (responsável ou admin).
2. Transação: atualiza estágio, grava atividade de sistema (“Estágio: Novo → Contactado”).
3. Se o destino é `fechado` e há moto: status da moto vira `sold` e `soldAt` recebe agora.
4. Se o destino é `perdido`: recusa salvar sem `lostReason`.

### 4.3 Catálogo
Consulta motos `active`, com os filtros da URL. A página da moto incrementa `views` uma vez por sessão. Pausada e vendida respondem 404 no site e continuam abrindo dentro do CRM.

---

## 5. Autorização

| Ação | Visitante | Vendedor | Admin |
|---|---|---|---|
| Ver catálogo | sim | sim | sim |
| Enviar interesse | sim | sim | sim |
| Ver interesses | | os seus, e os sem responsável | todos |
| Mudar estágio, atividade, tarefa | | nos seus interesses | todos |
| CRUD de motos e usuários | | | sim |
| Dados da loja | | leitura | escrita |

Toda função de escrita chama `requireUser()` e confere o papel. O layout do painel redireciona para `/admin/login` sem sessão.

---

## 6. Dados e integridade

- Telefone único por pessoa, só dígitos, com DDI 55 quando o visitante omitir
- `bike.slug` único
- Interesse guarda `bikeId` mesmo depois da venda (chave estrangeira, sem apagar a moto)
- Exclusão de moto com interesses: bloquear e orientar a pausar
- Exclusão de pessoa: operação de admin, registrada, para pedido LGPD

Índices e enums estão no schema de [EXEMPLOS_CODIGO.md](./EXEMPLOS_CODIGO.md).

---

## 7. Arquivos e e-mail

- Upload só de JPEG, PNG ou WebP, até 8 MB, redimensionado para a galeria
- URL pública de leitura, escrita apenas pelo servidor
- E-mail transacional com destinatário fixo da loja (`settings.email`) e resposta para o visitante no corpo, não como remetente

---

## 8. Ambientes

| Ambiente | Uso |
|---|---|
| Local | Next.js + PostgreSQL via Docker |
| Homologação | Mesmo schema, estoque de teste, e-mail para a caixa do desenvolvedor |
| Produção | Domínio da loja, backup diário, HTTPS |

Variáveis: `DATABASE_URL`, `AUTH_SECRET`, `S3_*`, `SMTP_*`, `NEXT_PUBLIC_SITE_URL`.

---

## 9. Observabilidade mínima

- Log de erro no servidor com id do interesse quando a captação falhar
- Health check simples que executa `SELECT 1`
- Backup automático do banco
- Analytics do site (visualização de página) separado do contador `views` da moto

---

## 10. Evolução

Quando uma segunda loja entrar, `Store` deixa de ser registro único e passa a filtrar moto, usuário e interesse. Até lá, um registro de loja evita complexidade de multi-tenant.

Chat em tempo real, fila e busca Elasticsearch, previstos na arquitetura da raiz, não entram neste desenho.

---

*Outubro de 2026. Versão CRM da arquitetura técnica.*
