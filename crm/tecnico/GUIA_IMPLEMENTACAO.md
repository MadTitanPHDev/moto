# Guia de implementação
## CRM da revenda + site de vitrine

Documento de origem: `GUIA_IMPLEMENTACAO.md` (raiz). O guia original sobe um backend NestJS separado e um frontend Next.js. Aqui o trabalho continua no app `web/`, com Prisma e PostgreSQL.

Os markdowns da raiz e o protótipo visual permanecem. Este guia diz a ordem para o protótipo passar a gravar.

---

## 1. Setup

### 1.1 Banco local

`docker-compose.yml` na raiz do app, só com Postgres:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: moto
      POSTGRES_PASSWORD: moto
      POSTGRES_DB: moto_crm
    ports:
      - "5432:5432"
    volumes:
      - moto_pg:/var/lib/postgresql/data
volumes:
  moto_pg:
```

### 1.2 Variáveis

`.env` em `web/` (não versionar segredos):

```text
DATABASE_URL="postgresql://moto:moto@localhost:5432/moto_crm"
AUTH_SECRET="troque-por-uma-string-longa"
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
STORE_NOTIFY_EMAIL="contato@loja.com.br"
S3_BUCKET=""
S3_REGION=""
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_PUBLIC_BASE_URL=""
```

### 1.3 Dependências

No diretório `web/`:

```bash
npm install prisma @prisma/client
npm install -D tsx
npx prisma init
```

Copiar o schema de [EXEMPLOS_CODIGO.md](./EXEMPLOS_CODIGO.md) para `web/prisma/schema.prisma`.

```bash
npx prisma migrate dev --name init_crm
```

### 1.4 Seed

Um script `prisma/seed.ts` cria:
- a loja com os dados que hoje estão em `company` dentro de `web/src/lib/data.ts`
- um usuário admin
- as motos de demonstração, se quiser manter a amostra
- duas pessoas e três interesses em estágios diferentes, para o funil não abrir vazio

---

## 2. Ordem de construção

### Semana 1 — Fundação
- [ ] Postgres no ar
- [ ] Schema migrado
- [ ] `src/server/db.ts` exporta o Prisma Client
- [ ] Login do admin valida e-mail e senha e grava sessão
- [ ] Layout `/admin` redireciona sem sessão
- [ ] Seed com admin e loja

### Semanas 2–3 — Estoque real
- [ ] Listar, criar, editar moto a partir do banco
- [ ] Upload de fotos
- [ ] Status ativo, pausado, vendido
- [ ] Catálogo e página pública leem só `active`
- [ ] Página de moto pausada ou vendida responde 404 no site
- [ ] Incremento de `views`

O visual dos componentes atuais (`BikeCard`, catálogo, header, footer) permanece. A origem dos dados muda.

### Semanas 4–5 — Captação
- [ ] Modal “Tenho interesse” envia para server action
- [ ] Formulário de contato faz o mesmo, sem moto
- [ ] Deduplicação por telefone
- [ ] Interesse `novo` + tarefa “Fazer o primeiro contato”
- [ ] E-mail para `STORE_NOTIFY_EMAIL`
- [ ] Lista `/admin/interesses` e ficha com mudança de estágio gravada
- [ ] Exportar CSV

### Semanas 6–8 — Condução da venda
- [ ] Atividades: ligação, WhatsApp, visita, nota
- [ ] Tarefas com vencimento, lista de atrasadas no painel
- [ ] Funil com contagem real
- [ ] Fechar interesse marca a moto `sold`
- [ ] Perder exige motivo
- [ ] Papel `seller`: vê e edita a própria carteira
- [ ] Admin cadastra vendedor
- [ ] Configurações da loja (telefone, WhatsApp, endereço) alimentam o site

### Semanas 9–10 — Conteúdo, teste, publicação
- [ ] Trocar dados de demonstração pelos da loja
- [ ] Testar no celular o fluxo visitante → ficha → WhatsApp
- [ ] Backup automático
- [ ] HTTPS no domínio
- [ ] Duas sessões de treinamento: estoque, depois funil e tarefas

---

## 3. Regras que o código precisa cumprir

1. Telefone salvo só com dígitos. Na tela, formatar de novo.
2. Formulário público recusa mais de 5 envios por IP a cada 10 minutos.
3. Vendedor não altera moto nem usuário.
4. `fechado` e a moto `sold` acontecem na mesma transação.
5. E-mail falho fica em log; o interesse permanece.
6. Texto de atividade e mensagem do visitante passam por escape na renderização.
7. Senha com hash (argon2 ou bcrypt). O seed não usa a senha `demo` em produção.

---

## 4. Testes mínimos

| Caso | Resultado esperado |
|---|---|
| Interesse com telefone novo | Pessoa e interesse criados, tarefa aberta |
| Segundo interesse com o mesmo telefone | Mesma pessoa, novo interesse |
| Estágio perdido sem motivo | Gravação recusada |
| Estágio fechado | Moto some do catálogo |
| Visitante abre `/admin` | Vai para o login |
| Vendedor abre interesse de outro | 404 ou lista sem o registro |
| Catálogo | Não lista pausada nem vendida |

Ferramenta sugerida: testes de integração nas funções de `src/server/` com banco de teste, e um fluxo Playwright do modal até a lista do admin.

---

## 5. Deploy

1. Criar o Postgres gerenciado e rodar `prisma migrate deploy`.
2. Publicar o Next.js (Vercel ou equivalente) com as variáveis da seção 1.2.
3. Apontar o domínio e conferir o certificado.
4. Enviar um interesse de teste e confirmar o e-mail e a ficha.
5. Agendar backup diário e um restore de ensaio antes da entrega.

---

## 6. Checklist de entrega

### Site
- [ ] Home, catálogo, detalhe, sobre, contato e blog no ar
- [ ] Filtros refletem o banco
- [ ] Interesse e contato gravam
- [ ] WhatsApp usa o número das configurações
- [ ] Uso confortável no celular

### CRM
- [ ] Login real
- [ ] CRUD de moto com fotos
- [ ] Funil, ficha, histórico e tarefas
- [ ] Tarefas atrasadas no painel
- [ ] CSV
- [ ] Dois usuários com papéis diferentes
- [ ] Venda remove a moto do site

### Operação
- [ ] Backup testado
- [ ] HTTPS
- [ ] Treinamento feito
- [ ] Manual curto: publicar moto, atender interesse, concluir tarefa

---

## 7. O que não implementar neste guia

Gateway, microserviços NestJS, Socket.io, Elasticsearch, planos de assinatura e app nativo. Estão descritos nos documentos da raiz para o marketplace e não fazem parte deste CRM.

---

*Outubro de 2026. Versão CRM do guia de implementação.*
