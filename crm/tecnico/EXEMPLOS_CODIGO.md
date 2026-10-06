# Exemplos de código
## CRM da revenda + site de vitrine

Documento de origem: `EXEMPLOS_CODIGO.md` (raiz). O schema original modela comprador, vendedor, conversa, favorito e avaliação de marketplace. O schema abaixo modela **loja, equipe, moto, pessoa, interesse, atividade e tarefa**.

São exemplos de referência para a implementação. Não estão ligados ao protótipo, que continua lendo `web/src/lib/data.ts`.

---

## 1. Schema Prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  SELLER
}

enum BikeStatus {
  ACTIVE
  PAUSED
  SOLD
}

enum PersonSource {
  SITE
  WHATSAPP
  STORE
  REFERRAL
}

enum DealStage {
  NEW
  CONTACTED
  NEGOTIATION
  WON
  LOST
}

enum LostReason {
  PRICE
  BOUGHT_ELSEWHERE
  NO_RESPONSE
  GAVE_UP
  OTHER
}

enum ActivityType {
  CALL
  WHATSAPP
  VISIT
  NOTE
  SYSTEM
}

model Store {
  id        String @id @default(cuid())
  name      String
  tagline   String
  city      String
  state     String
  address   String
  phone     String
  whatsapp  String
  email     String
  instagram String?
  hours     String
  logoUrl   String?
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         UserRole @default(SELLER)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())

  ownedDeals    Deal[]     @relation("DealOwner")
  activities    Activity[]
  assignedTasks Task[]     @relation("TaskAssignee")

  @@map("users")
}

model Bike {
  id                 String     @id @default(cuid())
  slug               String     @unique
  brand              String
  model              String
  version            String?
  year               Int
  manufacturingYear  Int
  mileage            Int
  color              String
  fuelType           String
  transmission       String
  engineCc           Int
  price              Int
  negotiable         Boolean    @default(false)
  acceptTrade        Boolean    @default(false)
  city               String
  state              String
  description        String
  features           String[]
  images             String[]
  status             BikeStatus @default(ACTIVE)
  views              Int        @default(0)
  featured           Boolean    @default(false)
  singleOwner        Boolean    @default(false)
  abs                Boolean    @default(false)
  soldAt             DateTime?
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt

  deals Deal[]

  @@index([status])
  @@index([brand, year])
  @@map("bikes")
}

model Person {
  id        String       @id @default(cuid())
  name      String
  phone     String       @unique
  email     String?
  source    PersonSource @default(SITE)
  notes     String?
  createdAt DateTime     @default(now())

  deals Deal[]

  @@index([name])
  @@map("people")
}

model Deal {
  id             String      @id @default(cuid())
  personId       String
  bikeId         String?
  ownerId        String?
  message        String
  stage          DealStage   @default(NEW)
  lostReason     LostReason?
  referencePrice Int?
  closedAt       DateTime?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  person     Person     @relation(fields: [personId], references: [id])
  bike       Bike?      @relation(fields: [bikeId], references: [id])
  owner      User?      @relation("DealOwner", fields: [ownerId], references: [id])
  activities Activity[]
  tasks      Task[]

  @@index([stage])
  @@index([ownerId])
  @@index([bikeId])
  @@index([createdAt])
  @@map("deals")
}

model Activity {
  id         String       @id @default(cuid())
  dealId     String
  authorId   String?
  type       ActivityType
  body       String
  happenedAt DateTime     @default(now())

  deal   Deal  @relation(fields: [dealId], references: [id], onDelete: Cascade)
  author User? @relation(fields: [authorId], references: [id])

  @@index([dealId, happenedAt])
  @@map("activities")
}

model Task {
  id         String    @id @default(cuid())
  dealId     String
  assigneeId String?
  title      String
  dueAt      DateTime
  doneAt     DateTime?
  createdAt  DateTime  @default(now())

  deal     Deal  @relation(fields: [dealId], references: [id], onDelete: Cascade)
  assignee User? @relation("TaskAssignee", fields: [assigneeId], references: [id])

  @@index([dueAt])
  @@index([assigneeId])
  @@map("tasks")
}
```

`Person.phone` guarda só dígitos, com DDI. A formatação fica na interface.

---

## 2. Normalizar telefone

```ts
export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  if (digits.length < 12 || digits.length > 13) {
    throw new Error("Informe o telefone com DDD.");
  }
  return digits;
}
```

---

## 3. Criar interesse a partir do site

```ts
import { prisma } from "@/server/db";
import { normalizePhone } from "@/server/phone";

export async function captureInterest(input: {
  name: string;
  phone: string;
  email?: string;
  message: string;
  bikeId?: string;
}) {
  const phone = normalizePhone(input.phone);

  return prisma.$transaction(async (tx) => {
    const person = await tx.person.upsert({
      where: { phone },
      update: {
        name: input.name,
        email: input.email || undefined,
      },
      create: {
        name: input.name,
        phone,
        email: input.email,
        source: "SITE",
      },
    });

    const bike = input.bikeId
      ? await tx.bike.findUnique({ where: { id: input.bikeId } })
      : null;

    const deal = await tx.deal.create({
      data: {
        personId: person.id,
        bikeId: bike?.id,
        message: input.message,
        referencePrice: bike?.price,
        stage: "NEW",
      },
    });

    const due = new Date();
    due.setDate(due.getDate() + 1);
    due.setHours(18, 0, 0, 0);

    await tx.task.create({
      data: {
        dealId: deal.id,
        title: "Fazer o primeiro contato",
        dueAt: due,
      },
    });

    await tx.activity.create({
      data: {
        dealId: deal.id,
        type: "SYSTEM",
        body: bike
          ? `Interesse recebido pelo site na ${bike.brand} ${bike.model}.`
          : "Contato recebido pelo site.",
      },
    });

    return { person, deal };
  });
}
```

O envio do e-mail fica fora da transação, depois do commit.

---

## 4. Fechar a venda

```ts
export async function markDealWon(dealId: string, authorId: string) {
  return prisma.$transaction(async (tx) => {
    const deal = await tx.deal.findUniqueOrThrow({ where: { id: dealId } });

    const updated = await tx.deal.update({
      where: { id: dealId },
      data: { stage: "WON", closedAt: new Date(), lostReason: null },
    });

    if (deal.bikeId) {
      await tx.bike.update({
        where: { id: deal.bikeId },
        data: { status: "SOLD", soldAt: new Date() },
      });
    }

    await tx.activity.create({
      data: {
        dealId,
        authorId,
        type: "SYSTEM",
        body: "Interesse fechado. Moto marcada como vendida.",
      },
    });

    return updated;
  });
}
```

---

## 5. Tarefas atrasadas

```ts
export function overdueTasks(assigneeId?: string) {
  return prisma.task.findMany({
    where: {
      doneAt: null,
      dueAt: { lt: new Date() },
      assigneeId,
    },
    include: {
      deal: { include: { person: true, bike: true } },
    },
    orderBy: { dueAt: "asc" },
  });
}
```

---

## 6. Catálogo público

```ts
export function listActiveBikes(filters: {
  brand?: string;
  yearMin?: number;
  priceMax?: number;
}) {
  return prisma.bike.findMany({
    where: {
      status: "ACTIVE",
      brand: filters.brand,
      year: filters.yearMin ? { gte: filters.yearMin } : undefined,
      price: filters.priceMax ? { lte: filters.priceMax } : undefined,
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}
```

---

## 7. CSV de interesses

Colunas: data, nome, telefone, e-mail, moto, estágio, responsável, mensagem.

O preço em centavos ou em reais inteiros deve ser uma decisão só. O protótipo guarda reais inteiros (`price: 35900`). O schema acima segue essa convenção.

---

*Outubro de 2026. Versão CRM dos exemplos de código.*
