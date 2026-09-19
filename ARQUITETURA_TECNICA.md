# Arquitetura Técnica Detalhada
## Marketplace de Veículos

---

## 1. Visão Geral da Arquitetura

### 1.1 Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CAMADA DE USUÁRIO                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Browser  │  │  Mobile  │  │  Tablet  │  │  Search Engine   │   │
│  │  (PWA)   │  │   App    │  │          │  │   Crawlers       │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   │ HTTPS
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                            CDN (CloudFlare)                          │
│  - Cache estático (HTML, CSS, JS, Images)                           │
│  - DDoS Protection                                                   │
│  - SSL/TLS Termination                                              │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
    ┌───────────────────────────┐   ┌──────────────────────────┐
    │   FRONTEND (Vercel)       │   │   BACKEND API            │
    │   Next.js 14+ App Router  │   │   (AWS/Railway)          │
    │   - SSR/SSG               │   │   NestJS + TypeScript    │
    │   - API Routes (BFF)      │   │   ┌──────────────────┐   │
    │   - Image Optimization    │   │   │  Auth Service    │   │
    └───────────────────────────┘   │   ├──────────────────┤   │
                    │               │   │ Vehicle Service  │   │
                    │               │   ├──────────────────┤   │
                    └───────────────┼──▶│ Message Service  │   │
                                    │   ├──────────────────┤   │
                                    │   │  User Service    │   │
                                    │   ├──────────────────┤   │
                                    │   │ Search Service   │   │
                                    │   └──────────────────┘   │
                                    └──────────────────────────┘
                                               │
                        ┌──────────────────────┼──────────────────────┐
                        ▼                      ▼                      ▼
            ┌────────────────────┐ ┌────────────────┐   ┌─────────────────┐
            │   PostgreSQL       │ │  Redis Cache   │   │   AWS S3        │
            │   (AWS RDS)        │ │  - Sessions    │   │  - Imagens      │
            │   - Dados          │ │  - Rate Limit  │   │  - Documentos   │
            │     estruturados   │ │  - Queue       │   │                 │
            └────────────────────┘ └────────────────┘   └─────────────────┘
                        │
                        ▼
            ┌────────────────────┐
            │  Backup Storage    │
            │  (AWS S3 Glacier)  │
            └────────────────────┘
```

---

## 2. Arquitetura do Backend (NestJS)

### 2.1 Estrutura Modular

```
backend/
├── src/
│   ├── main.ts                          # Entry point
│   ├── app.module.ts                    # Root module
│   │
│   ├── common/                          # Shared utilities
│   │   ├── decorators/
│   │   │   ├── public.decorator.ts      # @Public() para rotas abertas
│   │   │   ├── roles.decorator.ts       # @Roles() RBAC
│   │   │   └── current-user.decorator.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts        # JWT validation
│   │   │   ├── roles.guard.ts           # Role-based access
│   │   │   └── throttle.guard.ts        # Rate limiting
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts # Response formatting
│   │   │   └── cache.interceptor.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── pipes/
│   │   │   ├── validation.pipe.ts
│   │   │   └── parse-id.pipe.ts
│   │   └── constants/
│   │       └── error-messages.ts
│   │
│   ├── config/                          # Configuration
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   ├── aws.config.ts
│   │   └── redis.config.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/                        # Autenticação
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── local.strategy.ts
│   │   │   │   └── google.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── refresh-token.dto.ts
│   │   │
│   │   ├── users/                       # Usuários
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       ├── update-user.dto.ts
│   │   │       └── user-profile.dto.ts
│   │   │
│   │   ├── vehicles/                    # Veículos
│   │   │   ├── vehicles.module.ts
│   │   │   ├── vehicles.controller.ts
│   │   │   ├── vehicles.service.ts
│   │   │   ├── vehicles.repository.ts
│   │   │   ├── entities/
│   │   │   │   └── vehicle.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-vehicle.dto.ts
│   │   │   │   ├── update-vehicle.dto.ts
│   │   │   │   ├── search-vehicle.dto.ts
│   │   │   │   └── vehicle-filter.dto.ts
│   │   │   └── specifications/
│   │   │       ├── car.spec.ts
│   │   │       └── motorcycle.spec.ts
│   │   │
│   │   ├── messages/                    # Sistema de mensagens
│   │   │   ├── messages.module.ts
│   │   │   ├── messages.gateway.ts      # WebSocket
│   │   │   ├── messages.service.ts
│   │   │   ├── conversations.service.ts
│   │   │   └── dto/
│   │   │       ├── send-message.dto.ts
│   │   │       └── create-conversation.dto.ts
│   │   │
│   │   ├── uploads/                     # Upload de arquivos
│   │   │   ├── uploads.module.ts
│   │   │   ├── uploads.controller.ts
│   │   │   ├── uploads.service.ts
│   │   │   ├── image-processor.service.ts
│   │   │   └── s3.service.ts
│   │   │
│   │   ├── search/                      # Busca e filtros
│   │   │   ├── search.module.ts
│   │   │   ├── search.service.ts
│   │   │   ├── elasticsearch.service.ts # Futuro
│   │   │   └── search-indexer.service.ts
│   │   │
│   │   ├── notifications/               # Notificações
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── email.service.ts
│   │   │   └── push.service.ts
│   │   │
│   │   └── admin/                       # Painel admin
│   │       ├── admin.module.ts
│   │       ├── admin.controller.ts
│   │       ├── moderation.service.ts
│   │       └── analytics.service.ts
│   │
│   ├── database/                        # Prisma
│   │   ├── prisma.service.ts
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seeds/
│   │       ├── users.seed.ts
│   │       └── vehicles.seed.ts
│   │
│   └── queue/                           # Background jobs
│       ├── queue.module.ts
│       ├── processors/
│       │   ├── image-resize.processor.ts
│       │   ├── email.processor.ts
│       │   └── search-index.processor.ts
│       └── jobs/
│           ├── cleanup-old-data.job.ts
│           └── generate-reports.job.ts
│
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── package.json
```

### 2.2 Fluxo de Requisição

```
1. Cliente envia request
   ↓
2. Guard de Autenticação (JWT)
   ↓
3. Guard de Autorização (Roles)
   ↓
4. Interceptor de Logging
   ↓
5. Validation Pipe (class-validator)
   ↓
6. Controller recebe request
   ↓
7. Service executa lógica de negócio
   ↓
8. Repository acessa database
   ↓
9. Service retorna dados
   ↓
10. Transform Interceptor formata response
    ↓
11. Cliente recebe response
```

### 2.3 Exemplo de Endpoint com Todas as Camadas

```typescript
// vehicles.controller.ts
@Controller('vehicles')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @Public() // Decorator customizado: não exige autenticação
  @ApiOperation({ summary: 'List vehicles with filters' })
  @ApiQuery({ name: 'brand', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  async findAll(
    @Query() filterDto: VehicleFilterDto,
    @Query('page', ParseIntPipe) page: number = 1,
  ): Promise<PaginatedResult<Vehicle>> {
    return this.vehiclesService.findAll(filterDto, page);
  }

  @Post()
  @Roles(Role.SELLER, Role.DEALERSHIP)
  @ApiOperation({ summary: 'Create vehicle listing' })
  async create(
    @CurrentUser() user: User,
    @Body() createDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.create(user.id, createDto);
  }

  @Patch(':id')
  @Roles(Role.SELLER, Role.DEALERSHIP)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
    @Body() updateDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(id, user.id, updateDto);
  }
}

// vehicles.service.ts
@Injectable()
export class VehiclesService {
  constructor(
    private readonly repository: VehiclesRepository,
    private readonly cacheManager: Cache,
    private readonly searchService: SearchService,
  ) {}

  async findAll(
    filter: VehicleFilterDto,
    page: number,
  ): Promise<PaginatedResult<Vehicle>> {
    // Tenta cache primeiro
    const cacheKey = `vehicles:${JSON.stringify(filter)}:${page}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    // Busca no database
    const result = await this.repository.findWithFilters(filter, page);

    // Salva no cache por 5 minutos
    await this.cacheManager.set(cacheKey, result, 300);

    return result;
  }

  async create(userId: string, dto: CreateVehicleDto): Promise<Vehicle> {
    // Validação de negócio
    await this.validateVehicleData(dto);

    // Criação
    const vehicle = await this.repository.create({
      ...dto,
      sellerId: userId,
      status: VehicleStatus.PENDING_APPROVAL,
    });

    // Indexa para busca (async)
    await this.searchService.indexVehicle(vehicle);

    // Invalida cache
    await this.cacheManager.del('vehicles:*');

    return vehicle;
  }
}

// vehicles.repository.ts
@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findWithFilters(
    filter: VehicleFilterDto,
    page: number,
  ): Promise<PaginatedResult<Vehicle>> {
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: Prisma.VehicleWhereInput = {
      status: VehicleStatus.ACTIVE,
      ...(filter.brand && { brand: { contains: filter.brand, mode: 'insensitive' } }),
      ...(filter.minPrice && { price: { gte: filter.minPrice } }),
      ...(filter.maxPrice && { price: { lte: filter.maxPrice } }),
      ...(filter.year && { year: filter.year }),
    };

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          seller: {
            select: {
              id: true,
              firstName: true,
              rating: true,
            },
          },
        },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      data: vehicles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
```

---

## 3. Arquitetura do Frontend (Next.js)

### 3.1 Estrutura de Diretórios

```
frontend/
├── src/
│   ├── app/                             # App Router (Next.js 14+)
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Home page
│   │   ├── error.tsx                    # Error boundary
│   │   ├── loading.tsx                  # Loading UI
│   │   │
│   │   ├── (auth)/                      # Auth group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── vehicles/                    # Vehicle pages
│   │   │   ├── page.tsx                 # List (SSR)
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx             # Detail (SSR)
│   │   │   └── new/
│   │   │       └── page.tsx             # Create (CSR)
│   │   │
│   │   ├── profile/
│   │   │   ├── [userId]/
│   │   │   │   └── page.tsx             # Public profile
│   │   │   └── me/
│   │   │       ├── page.tsx             # My profile
│   │   │       ├── vehicles/
│   │   │       │   └── page.tsx
│   │   │       └── messages/
│   │   │           └── page.tsx
│   │   │
│   │   ├── search/
│   │   │   └── page.tsx                 # Search results
│   │   │
│   │   └── api/                         # API Routes (BFF)
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       └── upload/
│   │           └── route.ts
│   │
│   ├── components/                      # React components
│   │   ├── ui/                          # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── vehicle/
│   │   │   ├── VehicleCard.tsx
│   │   │   ├── VehicleGrid.tsx
│   │   │   ├── VehicleDetails.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── VehicleFilters.tsx
│   │   │   └── VehicleComparison.tsx
│   │   │
│   │   ├── forms/
│   │   │   ├── VehicleForm/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Step1Basic.tsx
│   │   │   │   ├── Step2Specs.tsx
│   │   │   │   ├── Step3Photos.tsx
│   │   │   │   └── Step4Review.tsx
│   │   │   └── SearchForm.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── ConversationList.tsx
│   │   │
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── Pagination.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/                             # Utilities
│   │   ├── api/
│   │   │   ├── client.ts                # Axios instance
│   │   │   ├── vehicles.ts              # Vehicle API calls
│   │   │   ├── auth.ts
│   │   │   └── messages.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useVehicles.ts
│   │   │   ├── useChat.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useInfiniteScroll.ts
│   │   │
│   │   ├── store/                       # Zustand stores
│   │   │   ├── auth.store.ts
│   │   │   ├── filters.store.ts
│   │   │   └── chat.store.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.ts            # Currency, date, etc
│   │   │   ├── validators.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   │
│   │   └── types/
│   │       ├── vehicle.ts
│   │       ├── user.ts
│   │       └── api.ts
│   │
│   ├── styles/
│   │   └── globals.css                  # Tailwind imports
│   │
│   └── config/
│       ├── site.ts                      # Site metadata
│       └── constants.ts
│
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.2 Exemplo de Página com SSR

```typescript
// app/vehicles/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VehicleDetails from '@/components/vehicle/VehicleDetails';
import ImageGallery from '@/components/vehicle/ImageGallery';
import SellerCard from '@/components/vehicle/SellerCard';
import SimilarVehicles from '@/components/vehicle/SimilarVehicles';
import { getVehicleById } from '@/lib/api/vehicles';

interface PageProps {
  params: { id: string };
}

// Geração de metadata dinâmica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = await getVehicleById(params.id);
  
  if (!vehicle) return {};

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${vehicle.price}`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
      description: vehicle.description,
      images: [vehicle.mainImage],
    },
  };
}

// Server-side rendering
export default async function VehiclePage({ params }: PageProps) {
  const vehicle = await getVehicleById(params.id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna principal */}
        <div className="lg:col-span-2">
          <ImageGallery images={vehicle.images} />
          <VehicleDetails vehicle={vehicle} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SellerCard seller={vehicle.seller} />
          <PriceCard 
            price={vehicle.price} 
            negotiable={vehicle.negotiable}
          />
          <ContactButtons vehicleId={vehicle.id} />
        </div>
      </div>

      {/* Veículos similares */}
      <div className="mt-12">
        <SimilarVehicles vehicleId={vehicle.id} />
      </div>
    </div>
  );
}
```

### 3.3 Exemplo de Componente com Client State

```typescript
// components/vehicle/VehicleFilters.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useFilterStore } from '@/lib/store/filters.store';

export default function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters, resetFilters } = useFilterStore();

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      <div className="space-y-4">
        {/* Marca */}
        <div>
          <label className="block text-sm font-medium mb-2">Marca</label>
          <Select
            value={filters.brand}
            onChange={(e) => setFilters({ brand: e.target.value })}
          >
            <option value="">Todas</option>
            <option value="honda">Honda</option>
            <option value="toyota">Toyota</option>
            {/* ... */}
          </Select>
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium mb-2">Preço</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mín"
              value={filters.minPrice}
              onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Máx"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Ano */}
        <div>
          <label className="block text-sm font-medium mb-2">Ano</label>
          <div className="flex gap-2">
            <Select
              value={filters.minYear}
              onChange={(e) => setFilters({ minYear: Number(e.target.value) })}
            >
              <option value="">De</option>
              {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
            <Select
              value={filters.maxYear}
              onChange={(e) => setFilters({ maxYear: Number(e.target.value) })}
            >
              <option value="">Até</option>
              {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleApplyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Sistema de Chat (WebSocket)

### 4.1 Arquitetura de Mensagens em Tempo Real

```
┌─────────────┐         WebSocket         ┌─────────────────┐
│  Cliente A  │◄────────────────────────►│  NestJS Gateway │
└─────────────┘                           └─────────────────┘
                                                    │
┌─────────────┐         WebSocket                  │
│  Cliente B  │◄────────────────────────►│         │
└─────────────┘                           │         │
                                          ▼         ▼
                                    ┌──────────────────┐
                                    │  Redis PubSub    │
                                    │  (para múltiplas │
                                    │   instâncias)    │
                                    └──────────────────┘
                                            │
                                            ▼
                                    ┌──────────────────┐
                                    │   PostgreSQL     │
                                    │  (persistência)  │
                                    └──────────────────┘
```

### 4.2 Implementação Backend (NestJS)

```typescript
// messages.gateway.ts
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>(); // userId -> socketId

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      // Extrai token do handshake
      const token = client.handshake.auth.token;
      const payload = await this.jwtService.verifyAsync(token);
      
      // Mapeia userId -> socketId
      this.userSockets.set(payload.sub, client.id);
      client.data.userId = payload.sub;

      // Notifica que está online
      this.server.emit('user:online', { userId: payload.sub });

      console.log(`User ${payload.sub} connected: ${client.id}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      this.userSockets.delete(userId);
      this.server.emit('user:offline', { userId });
    }
  }

  @SubscribeMessage('message:send')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SendMessageDto,
  ) {
    const senderId = client.data.userId;

    // Salva no database
    const message = await this.messagesService.create({
      conversationId: data.conversationId,
      senderId,
      content: data.content,
      isProposal: data.isProposal,
      proposalAmount: data.proposalAmount,
    });

    // Busca o destinatário
    const conversation = await this.messagesService.getConversation(
      data.conversationId,
    );
    const recipientId = conversation.buyerId === senderId 
      ? conversation.sellerId 
      : conversation.buyerId;

    // Envia para o destinatário se estiver online
    const recipientSocketId = this.userSockets.get(recipientId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('message:received', message);
    }

    // Confirma para o remetente
    client.emit('message:sent', message);

    // Envia notificação push se destinatário offline (background job)
    if (!recipientSocketId) {
      // Queue para enviar notificação
    }

    return { success: true, messageId: message.id };
  }

  @SubscribeMessage('message:read')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { messageId: string },
  ) {
    await this.messagesService.markAsRead(data.messageId);
    
    // Notifica o remetente original
    const message = await this.messagesService.findById(data.messageId);
    const senderSocketId = this.userSockets.get(message.senderId);
    
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('message:read', {
        messageId: data.messageId,
        readBy: client.data.userId,
      });
    }
  }

  @SubscribeMessage('typing:start')
  handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string },
  ) {
    // Broadcast para outros na conversa
    client.to(data.conversationId).emit('user:typing', {
      userId: client.data.userId,
      conversationId: data.conversationId,
    });
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string },
  ) {
    client.to(data.conversationId).emit('user:stopped-typing', {
      userId: client.data.userId,
      conversationId: data.conversationId,
    });
  }
}
```

### 4.3 Implementação Frontend (React)

```typescript
// lib/hooks/useChat.ts
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export function useChat(conversationId: string) {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Conecta ao WebSocket
  useEffect(() => {
    if (!token) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_WS_URL!, {
      auth: { token },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('join:conversation', { conversationId });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('message:received', (message: Message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
        // Auto-marca como lida
        socketInstance.emit('message:read', { messageId: message.id });
      }
    });

    socketInstance.on('user:typing', ({ userId }) => {
      setIsTyping(true);
    });

    socketInstance.on('user:stopped-typing', () => {
      setIsTyping(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, conversationId]);

  // Envia mensagem
  const sendMessage = useCallback((content: string, isProposal = false, amount?: number) => {
    if (!socket || !content.trim()) return;

    socket.emit('message:send', {
      conversationId,
      content,
      isProposal,
      proposalAmount: amount,
    });
  }, [socket, conversationId]);

  // Indicadores de digitação
  const startTyping = useCallback(() => {
    socket?.emit('typing:start', { conversationId });
  }, [socket, conversationId]);

  const stopTyping = useCallback(() => {
    socket?.emit('typing:stop', { conversationId });
  }, [socket, conversationId]);

  return {
    messages,
    sendMessage,
    isTyping,
    isConnected,
    startTyping,
    stopTyping,
  };
}
```

---

## 5. Sistema de Upload de Imagens

### 5.1 Fluxo de Upload

```
Cliente                Frontend              Backend              S3
  │                      │                     │                   │
  │──1. Seleciona────►│                     │                   │
  │    imagens          │                     │                   │
  │                     │                     │                   │
  │                     │──2. Pré-processa──►│                   │
  │                     │    (resize client)  │                   │
  │                     │                     │                   │
  │                     │──3. POST /upload──►│                   │
  │                     │    multipart/form   │                   │
  │                     │                     │                   │
  │                     │                     │──4. Valida────►  │
  │                     │                     │    (tipo, tam.)   │
  │                     │                     │                   │
  │                     │                     │──5. Otimiza───►  │
  │                     │                     │   (Sharp)         │
  │                     │                     │   - Resize        │
  │                     │                     │   - WebP          │
  │                     │                     │   - Thumbnail     │
  │                     │                     │                   │
  │                     │                     │──6. Upload────►  │
  │                     │                     │                  │
  │                     │                     │◄─7. URL────────┘
  │                     │                     │                   │
  │                     │◄─8. Response──────┘                   │
  │                     │    {url, thumbUrl}                      │
  │                     │                     │                   │
  │◄─9. Preview────────┘                     │                   │
```

### 5.2 Implementação Backend

```typescript
// uploads.controller.ts
@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly imageProcessor: ImageProcessorService,
  ) {}

  @Post('vehicle-images')
  @UseInterceptors(
    FilesInterceptor('images', 30, {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Apenas imagens são permitidas'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadVehicleImages(
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: User,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhuma imagem foi enviada');
    }

    const uploadPromises = files.map(async (file) => {
      // Processa imagem
      const { optimized, thumbnail } = await this.imageProcessor.process(file);

      // Upload para S3
      const [imageUrl, thumbUrl] = await Promise.all([
        this.uploadsService.uploadToS3(optimized, 'vehicles'),
        this.uploadsService.uploadToS3(thumbnail, 'vehicles/thumbnails'),
      ]);

      return {
        url: imageUrl,
        thumbnailUrl: thumbUrl,
        originalName: file.originalname,
        size: file.size,
      };
    });

    const results = await Promise.all(uploadPromises);

    return {
      success: true,
      images: results,
    };
  }
}

// image-processor.service.ts
@Injectable()
export class ImageProcessorService {
  async process(file: Express.Multer.File) {
    // Imagem otimizada (max 1920x1080)
    const optimized = await sharp(file.buffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer();

    // Thumbnail (300x200)
    const thumbnail = await sharp(file.buffer)
      .resize(300, 200, {
        fit: 'cover',
      })
      .webp({ quality: 70 })
      .toBuffer();

    return { optimized, thumbnail };
  }

  async generateWatermark(buffer: Buffer, text: string): Promise<Buffer> {
    // SVG do watermark
    const svg = `
      <svg width="200" height="50">
        <text x="50%" y="50%" 
              font-family="Arial" 
              font-size="24" 
              fill="white" 
              opacity="0.5" 
              text-anchor="middle">
          ${text}
        </text>
      </svg>
    `;

    return sharp(buffer)
      .composite([
        {
          input: Buffer.from(svg),
          gravity: 'southeast',
        },
      ])
      .toBuffer();
  }
}

// s3.service.ts
@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(buffer: Buffer, folder: string): Promise<string> {
    const filename = `${folder}/${uuidv4()}.webp`;
    const bucket = this.configService.get('AWS_S3_BUCKET');

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        Body: buffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000',
      }),
    );

    return `https://${bucket}.s3.amazonaws.com/${filename}`;
  }
}
```

---

## 6. Estratégias de Cache

### 6.1 Camadas de Cache

```
┌─────────────────────────────────────────────────┐
│ LAYER 1: CDN (CloudFlare)                      │
│ - Assets estáticos (JS, CSS, imagens)          │
│ - HTML estático (SSG pages)                    │
│ - TTL: 1 ano (assets), 1 hora (HTML)          │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│ LAYER 2: Next.js Cache                         │
│ - Data fetching cache                           │
│ - Full route cache (SSG)                       │
│ - TTL: Configurável por rota                   │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│ LAYER 3: Redis Cache                           │
│ - API responses                                 │
│ - Resultados de busca                          │
│ - Sessions                                      │
│ - TTL: 5-15 minutos                            │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│ LAYER 4: Database Query Cache (PostgreSQL)     │
│ - Query results                                 │
│ - Managed pelo Postgres                        │
└─────────────────────────────────────────────────┘
```

### 6.2 Estratégia de Invalidação

```typescript
// Quando um veículo é criado/editado/deletado
class VehiclesService {
  async update(id: string, data: UpdateVehicleDto) {
    // 1. Atualiza no database
    const vehicle = await this.repository.update(id, data);

    // 2. Invalida caches relacionados
    await Promise.all([
      // Cache de listagem
      this.cacheManager.del('vehicles:list:*'),
      // Cache específico do veículo
      this.cacheManager.del(`vehicle:${id}`),
      // Cache do seller
      this.cacheManager.del(`seller:${vehicle.sellerId}:vehicles`),
      // Revalida página Next.js (ISR)
      this.revalidate(`/vehicles/${id}`),
    ]);

    // 3. Atualiza índice de busca
    await this.searchService.updateIndex(vehicle);

    return vehicle;
  }
}
```

---

## 7. Segurança em Profundidade

### 7.1 Camadas de Segurança

```
REQUEST
   │
   ├─► 1. HTTPS/TLS (Transport Layer)
   │
   ├─► 2. WAF - Web Application Firewall (CloudFlare)
   │      - SQL Injection
   │      - XSS
   │      - DDoS
   │
   ├─► 3. Rate Limiting (Application)
   │      - Por IP
   │      - Por usuário
   │
   ├─► 4. CORS (Cross-Origin Resource Sharing)
   │      - Origins permitidas
   │
   ├─► 5. Authentication (JWT)
   │      - Token validation
   │      - Expiration check
   │
   ├─► 6. Authorization (RBAC)
   │      - Role check
   │      - Resource ownership
   │
   ├─► 7. Input Validation
   │      - Type checking
   │      - Sanitization
   │
   ├─► 8. Business Logic
   │
   └─► 9. Data Access Layer
          - Prepared statements
          - Query parameterization
```

---

## 8. Monitoramento e Observabilidade

### 8.1 Stack de Observabilidade

```
┌────────────────────────────────────────────────────┐
│             APLICAÇÃO (Frontend + Backend)          │
└────────────────────────────────────────────────────┘
         │          │           │            │
         │ Logs     │ Metrics   │ Traces     │ Errors
         ▼          ▼           ▼            ▼
    ┌────────┐ ┌────────┐ ┌─────────┐  ┌─────────┐
    │ Winston│ │ Prom.  │ │ Jaeger  │  │ Sentry  │
    └────────┘ └────────┘ └─────────┘  └─────────┘
         │          │           │            │
         └──────────┴───────────┴────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Grafana / Datadog  │
              │   (Visualização)     │
              └──────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Alerting           │
              │   - Slack            │
              │   - Email            │
              │   - PagerDuty        │
              └──────────────────────┘
```

### 8.2 Métricas Essenciais

```typescript
// Métricas de Negócio
{
  "daily_active_users": number,
  "new_registrations": number,
  "new_listings": number,
  "searches_performed": number,
  "messages_sent": number,
  "conversion_rate": {
    "search_to_view": percentage,
    "view_to_contact": percentage,
  }
}

// Métricas Técnicas
{
  "api_response_time_p95": milliseconds,
  "api_error_rate": percentage,
  "database_connections": number,
  "cache_hit_rate": percentage,
  "cdn_bandwidth": bytes,
}

// Métricas de Infra
{
  "cpu_usage": percentage,
  "memory_usage": percentage,
  "disk_usage": percentage,
  "network_throughput": bytes_per_second,
}
```

---

Este documento fornece a visão técnica detalhada da arquitetura, estrutura de código e implementações-chave do sistema.