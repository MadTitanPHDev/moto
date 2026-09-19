# Exemplos de Código Práticos
## Marketplace de Veículos

---

## 1. Schema Prisma Completo

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum UserType {
  BUYER
  SELLER
  DEALERSHIP
  ADMIN
}

enum VehicleType {
  CAR
  MOTORCYCLE
}

enum VehicleStatus {
  PENDING_APPROVAL
  ACTIVE
  SOLD
  PAUSED
  REJECTED
}

enum FuelType {
  GASOLINE
  ETHANOL
  FLEX
  DIESEL
  ELECTRIC
  HYBRID
}

enum Transmission {
  MANUAL
  AUTOMATIC
  SEMI_AUTOMATIC
}

// ============================================
// MODELS
// ============================================

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  firstName     String
  lastName      String
  phone         String?
  cpfCnpj       String   @unique
  userType      UserType @default(BUYER)
  
  // Verificação
  emailVerified Boolean  @default(false)
  phoneVerified Boolean  @default(false)
  
  // Perfil
  avatar        String?
  bio           String?
  
  // Reputação
  rating        Float    @default(0)
  totalReviews  Int      @default(0)
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  lastLogin     DateTime?
  
  // Status
  isActive      Boolean  @default(true)
  isBanned      Boolean  @default(false)
  banReason     String?
  
  // Relacionamentos
  vehicles           Vehicle[]
  favorites          Favorite[]
  sentMessages       Message[]
  conversationsAsBuyer  Conversation[] @relation("BuyerConversations")
  conversationsAsSeller Conversation[] @relation("SellerConversations")
  givenReviews       Review[] @relation("ReviewGiver")
  receivedReviews    Review[] @relation("ReviewReceiver")
  savedSearches      SavedSearch[]
  auditLogs          AuditLog[]
  
  @@index([email])
  @@index([cpfCnpj])
  @@index([userType])
  @@map("users")
}

model Vehicle {
  id              String         @id @default(uuid())
  sellerId        String
  vehicleType     VehicleType
  status          VehicleStatus  @default(PENDING_APPROVAL)
  
  // Informações básicas
  brand           String
  model           String
  version         String?
  year            Int
  manufacturingYear Int
  mileage         Int
  color           String
  
  // Especificações técnicas
  fuelType        FuelType
  transmission    Transmission
  engineSize      Float?
  doors           Int?
  
  // Preço
  price           Decimal        @db.Decimal(10, 2)
  negotiable      Boolean        @default(true)
  acceptTrade     Boolean        @default(false)
  
  // Localização
  state           String
  city            String
  zipCode         String
  
  // Descrição
  description     String         @db.Text
  features        Json           @default("[]")
  
  // Documentação
  plate           String?
  licensePlateEnd String
  hasDebts        Boolean        @default(false)
  singleOwner     Boolean        @default(false)
  ipvaPaid        Boolean        @default(false)
  licensed        Boolean        @default(false)
  
  // Mídia
  images          Json           @default("[]")
  mainImage       String
  
  // Métricas
  views           Int            @default(0)
  favoriteCount   Int            @default(0)
  contactCount    Int            @default(0)
  
  // Timestamps
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  publishedAt     DateTime?
  soldAt          DateTime?
  
  // SEO
  slug            String         @unique
  
  // Relacionamentos
  seller          User           @relation(fields: [sellerId], references: [id], onDelete: Cascade)
  favorites       Favorite[]
  conversations   Conversation[]
  reviews         Review[]
  
  @@index([sellerId])
  @@index([status])
  @@index([brand, model])
  @@index([price])
  @@index([year])
  @@index([state, city])
  @@index([createdAt])
  @@index([vehicleType])
  @@fulltext([brand, model, description])
  @@map("vehicles")
}

model Conversation {
  id              String    @id @default(uuid())
  vehicleId       String
  buyerId         String
  sellerId        String
  
  lastMessageAt   DateTime?
  lastMessage     String?
  
  isActive        Boolean   @default(true)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relacionamentos
  vehicle         Vehicle   @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  buyer           User      @relation("BuyerConversations", fields: [buyerId], references: [id], onDelete: Cascade)
  seller          User      @relation("SellerConversations", fields: [sellerId], references: [id], onDelete: Cascade)
  messages        Message[]
  
  @@unique([vehicleId, buyerId])
  @@index([buyerId])
  @@index([sellerId])
  @@index([lastMessageAt])
  @@map("conversations")
}

model Message {
  id              String       @id @default(uuid())
  conversationId  String
  senderId        String
  
  content         String       @db.Text
  
  isProposal      Boolean      @default(false)
  proposalAmount  Decimal?     @db.Decimal(10, 2)
  
  read            Boolean      @default(false)
  readAt          DateTime?
  
  createdAt       DateTime     @default(now())
  
  // Relacionamentos
  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  sender          User         @relation(fields: [senderId], references: [id], onDelete: Cascade)
  
  @@index([conversationId, createdAt])
  @@index([senderId])
  @@map("messages")
}

model Favorite {
  id         String   @id @default(uuid())
  userId     String
  vehicleId  String
  
  createdAt  DateTime @default(now())
  
  // Relacionamentos
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  vehicle    Vehicle  @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
  
  @@unique([userId, vehicleId])
  @@index([userId])
  @@index([vehicleId])
  @@map("favorites")
}

model Review {
  id              String   @id @default(uuid())
  reviewerId      String
  reviewedUserId  String
  vehicleId       String?
  
  rating          Int      // 1-5
  comment         String?  @db.Text
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relacionamentos
  reviewer        User     @relation("ReviewGiver", fields: [reviewerId], references: [id], onDelete: Cascade)
  reviewedUser    User     @relation("ReviewReceiver", fields: [reviewedUserId], references: [id], onDelete: Cascade)
  vehicle         Vehicle? @relation(fields: [vehicleId], references: [id], onDelete: SetNull)
  
  @@index([reviewerId])
  @@index([reviewedUserId])
  @@index([vehicleId])
  @@map("reviews")
}

model SavedSearch {
  id           String   @id @default(uuid())
  userId       String
  
  name         String
  filters      Json
  notifyOnNew  Boolean  @default(false)
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // Relacionamentos
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@map("saved_searches")
}

model AuditLog {
  id         String   @id @default(uuid())
  userId     String?
  
  action     String
  resource   String
  resourceId String?
  
  ip         String?
  userAgent  String?
  
  data       Json?
  
  createdAt  DateTime @default(now())
  
  // Relacionamentos
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("audit_logs")
}
```

---

## 2. Exemplos de DTOs (Backend)

### Create Vehicle DTO

```typescript
// dto/create-vehicle.dto.ts
import { 
  IsString, IsInt, IsEnum, IsBoolean, IsNumber, IsArray, 
  IsOptional, Min, Max, Length, Matches 
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { VehicleType, FuelType, Transmission } from '@prisma/client';

export class CreateVehicleDto {
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  // Informações básicas
  @IsString()
  @Length(2, 50)
  brand: string;

  @IsString()
  @Length(2, 50)
  model: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  version?: string;

  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsInt()
  @Min(1990)
  @Max(new Date().getFullYear())
  manufacturingYear: number;

  @IsInt()
  @Min(0)
  @Max(999999)
  mileage: number;

  @IsString()
  @Length(2, 30)
  color: string;

  // Especificações
  @IsEnum(FuelType)
  fuelType: FuelType;

  @IsEnum(Transmission)
  transmission: Transmission;

  @IsNumber()
  @IsOptional()
  @Min(0.5)
  @Max(10)
  engineSize?: number;

  @IsInt()
  @IsOptional()
  @Min(2)
  @Max(5)
  doors?: number;

  // Preço
  @IsNumber()
  @Min(1000)
  @Max(10000000)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsBoolean()
  negotiable: boolean;

  @IsBoolean()
  acceptTrade: boolean;

  // Localização
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/)
  state: string;

  @IsString()
  @Length(2, 100)
  city: string;

  @IsString()
  @Matches(/^\d{5}-?\d{3}$/)
  zipCode: string;

  // Descrição
  @IsString()
  @Length(50, 2000)
  description: string;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  // Documentação
  @IsString()
  @IsOptional()
  @Matches(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/) // Placas antiga e Mercosul
  plate?: string;

  @IsString()
  @Length(3, 3)
  licensePlateEnd: string;

  @IsBoolean()
  hasDebts: boolean;

  @IsBoolean()
  singleOwner: boolean;

  @IsBoolean()
  ipvaPaid: boolean;

  @IsBoolean()
  licensed: boolean;
}
```

### Vehicle Filter DTO

```typescript
// dto/vehicle-filter.dto.ts
import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { VehicleType, FuelType, Transmission } from '@prisma/client';

export class VehicleFilterDto {
  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1990)
  minYear?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Max(new Date().getFullYear() + 1)
  maxYear?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  maxMileage?: number;

  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(10)
  @Max(50)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sortBy?: 'createdAt' | 'price' | 'year' | 'mileage' = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
```

---

## 3. Services Completos (Backend)

### Vehicles Service

```typescript
// vehicles.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';
import { VehicleStatus } from '@prisma/client';
import { CacheService } from '../cache/cache.service';
import { SearchService } from '../search/search.service';
import { slugify } from '../../common/utils/slugify';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly repository: VehiclesRepository,
    private readonly cacheService: CacheService,
    private readonly searchService: SearchService,
  ) {}

  async create(userId: string, dto: CreateVehicleDto) {
    // Gerar slug único
    const baseSlug = slugify(`${dto.brand}-${dto.model}-${dto.year}`);
    const slug = await this.generateUniqueSlug(baseSlug);

    // Criar veículo
    const vehicle = await this.repository.create({
      ...dto,
      sellerId: userId,
      slug,
      status: VehicleStatus.PENDING_APPROVAL, // Requer moderação
    });

    // Indexar para busca (async)
    this.searchService.indexVehicle(vehicle).catch(console.error);

    // Invalidar cache
    await this.invalidateListCache();

    return vehicle;
  }

  async findAll(filters: VehicleFilterDto) {
    const cacheKey = `vehicles:list:${JSON.stringify(filters)}`;
    
    // Tentar cache
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    // Buscar no database
    const result = await this.repository.findWithFilters(filters);

    // Cachear por 5 minutos
    await this.cacheService.set(cacheKey, result, 300);

    return result;
  }

  async findById(id: string) {
    const cacheKey = `vehicle:${id}`;
    
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const vehicle = await this.repository.findById(id);
    
    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    // Incrementar views (async, não bloqueia)
    this.repository.incrementViews(id).catch(console.error);

    // Cachear por 10 minutos
    await this.cacheService.set(cacheKey, vehicle, 600);

    return vehicle;
  }

  async findBySlug(slug: string) {
    const cacheKey = `vehicle:slug:${slug}`;
    
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const vehicle = await this.repository.findBySlug(slug);
    
    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    await this.cacheService.set(cacheKey, vehicle, 600);

    return vehicle;
  }

  async update(id: string, userId: string, dto: UpdateVehicleDto) {
    const vehicle = await this.repository.findById(id);

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    // Verificar ownership
    if (vehicle.sellerId !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este veículo');
    }

    // Atualizar
    const updated = await this.repository.update(id, dto);

    // Atualizar índice de busca
    this.searchService.updateVehicle(updated).catch(console.error);

    // Invalidar caches
    await Promise.all([
      this.cacheService.del(`vehicle:${id}`),
      this.cacheService.del(`vehicle:slug:${vehicle.slug}`),
      this.invalidateListCache(),
    ]);

    return updated;
  }

  async delete(id: string, userId: string) {
    const vehicle = await this.repository.findById(id);

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    if (vehicle.sellerId !== userId) {
      throw new ForbiddenException('Você não tem permissão para deletar este veículo');
    }

    await this.repository.delete(id);

    // Remover do índice de busca
    this.searchService.removeVehicle(id).catch(console.error);

    // Invalidar caches
    await Promise.all([
      this.cacheService.del(`vehicle:${id}`),
      this.cacheService.del(`vehicle:slug:${vehicle.slug}`),
      this.invalidateListCache(),
    ]);
  }

  async updateStatus(id: string, status: VehicleStatus) {
    const updated = await this.repository.updateStatus(id, status);

    await Promise.all([
      this.cacheService.del(`vehicle:${id}`),
      this.invalidateListCache(),
    ]);

    return updated;
  }

  async getMySold(sellerId: string) {
    return this.repository.findBySeller(sellerId, VehicleStatus.SOLD);
  }

  async getStats(sellerId: string) {
    return this.repository.getSellerStats(sellerId);
  }

  private async generateUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (await this.repository.existsBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  private async invalidateListCache() {
    const pattern = 'vehicles:list:*';
    await this.cacheService.delPattern(pattern);
  }
}
```

---

## 4. Componentes React (Frontend)

### Vehicle Card Component

```typescript
// components/vehicle/VehicleCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Calendar, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';
import { useFavorites } from '@/lib/hooks/useFavorites';
import type { Vehicle } from '@/lib/types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  className?: string;
}

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const { isFavorited, toggle: toggleFavorite, isLoading } = useFavorites(vehicle.id);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite();
  };

  return (
    <Link href={`/vehicles/${vehicle.slug}`}>
      <Card className={cn(
        'overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]',
        className
      )}>
        {/* Imagem */}
        <div className="relative aspect-[16/9] bg-gray-100">
          <Image
            src={imageError ? '/placeholder-vehicle.jpg' : vehicle.mainImage}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badge de status */}
          {vehicle.status === 'SOLD' && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              Vendido
            </Badge>
          )}

          {/* Botão de favoritar */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleFavoriteClick}
            disabled={isLoading}
          >
            <Heart
              className={cn(
                'h-5 w-5',
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-700'
              )}
            />
          </Button>

          {/* Contador de fotos */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            📷 {vehicle.images.length}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 space-y-3">
          {/* Preço */}
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(vehicle.price)}
            </span>
            {vehicle.negotiable && (
              <Badge variant="secondary" className="text-xs">
                Negociável
              </Badge>
            )}
          </div>

          {/* Título */}
          <h3 className="font-semibold text-lg line-clamp-1">
            {vehicle.brand} {vehicle.model}
          </h3>

          {/* Detalhes */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {vehicle.year}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              {formatNumber(vehicle.mileage)} km
            </span>
          </div>

          {/* Câmbio e combustível */}
          <div className="flex gap-2 text-xs">
            <Badge variant="outline">{vehicle.transmission}</Badge>
            <Badge variant="outline">{vehicle.fuelType}</Badge>
          </div>

          {/* Localização */}
          <div className="flex items-center gap-1 text-sm text-gray-600 pt-2 border-t">
            <MapPin className="h-4 w-4" />
            <span>{vehicle.city}, {vehicle.state}</span>
          </div>

          {/* Métricas */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>👁️ {formatNumber(vehicle.views)} visualizações</span>
            <span>♥️ {formatNumber(vehicle.favoriteCount)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

### Vehicle Filters Component

```typescript
// components/vehicle/VehicleFilters.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/formatters';
import { BRANDS, FUEL_TYPES, TRANSMISSIONS } from '@/lib/constants';

export function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados dos filtros
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || '',
    model: searchParams.get('model') || '',
    minYear: parseInt(searchParams.get('minYear') || '2000'),
    maxYear: parseInt(searchParams.get('maxYear') || new Date().getFullYear().toString()),
    minPrice: parseInt(searchParams.get('minPrice') || '0'),
    maxPrice: parseInt(searchParams.get('maxPrice') || '500000'),
    maxMileage: parseInt(searchParams.get('maxMileage') || '200000'),
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
  });

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 0) {
        params.set(key, String(value));
      }
    });

    router.push(`/vehicles?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters({
      brand: '',
      model: '',
      minYear: 2000,
      maxYear: new Date().getFullYear(),
      minPrice: 0,
      maxPrice: 500000,
      maxMileage: 200000,
      fuelType: '',
      transmission: '',
      state: '',
      city: '',
    });
    router.push('/vehicles');
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={handleResetFilters}>
          Limpar
        </Button>
      </div>

      {/* Marca */}
      <div className="space-y-2">
        <Label htmlFor="brand">Marca</Label>
        <Select
          value={filters.brand}
          onValueChange={(value) => setFilters({ ...filters, brand: value })}
        >
          <SelectTrigger id="brand">
            <SelectValue placeholder="Todas as marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas</SelectItem>
            {BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Modelo */}
      <div className="space-y-2">
        <Label htmlFor="model">Modelo</Label>
        <Input
          id="model"
          placeholder="Ex: Civic, Corolla..."
          value={filters.model}
          onChange={(e) => setFilters({ ...filters, model: e.target.value })}
        />
      </div>

      {/* Ano */}
      <div className="space-y-2">
        <Label>
          Ano: {filters.minYear} - {filters.maxYear}
        </Label>
        <Slider
          min={1990}
          max={new Date().getFullYear()}
          step={1}
          value={[filters.minYear, filters.maxYear]}
          onValueChange={([min, max]) =>
            setFilters({ ...filters, minYear: min, maxYear: max })
          }
        />
      </div>

      {/* Preço */}
      <div className="space-y-2">
        <Label>
          Preço: {formatCurrency(filters.minPrice)} - {formatCurrency(filters.maxPrice)}
        </Label>
        <Slider
          min={0}
          max={500000}
          step={5000}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={([min, max]) =>
            setFilters({ ...filters, minPrice: min, maxPrice: max })
          }
        />
      </div>

      {/* Quilometragem */}
      <div className="space-y-2">
        <Label>
          Quilometragem máxima: {filters.maxMileage.toLocaleString()} km
        </Label>
        <Slider
          min={0}
          max={300000}
          step={10000}
          value={[filters.maxMileage]}
          onValueChange={([value]) => setFilters({ ...filters, maxMileage: value })}
        />
      </div>

      {/* Combustível */}
      <div className="space-y-2">
        <Label htmlFor="fuelType">Combustível</Label>
        <Select
          value={filters.fuelType}
          onValueChange={(value) => setFilters({ ...filters, fuelType: value })}
        >
          <SelectTrigger id="fuelType">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {FUEL_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Câmbio */}
      <div className="space-y-2">
        <Label htmlFor="transmission">Câmbio</Label>
        <Select
          value={filters.transmission}
          onValueChange={(value) => setFilters({ ...filters, transmission: value })}
        >
          <SelectTrigger id="transmission">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {TRANSMISSIONS.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Botão aplicar */}
      <Button className="w-full" onClick={handleApplyFilters}>
        Aplicar Filtros
      </Button>
    </Card>
  );
}
```

---

## 5. Custom Hooks (Frontend)

### useFavorites Hook

```typescript
// lib/hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '@/lib/api/favorites';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export function useFavorites(vehicleId: string) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [isFavorited, setIsFavorited] = useState(false);

  // Buscar status de favorito
  const { data: favorites } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: favoritesApi.getMyFavorites,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (favorites) {
      setIsFavorited(favorites.some((fav) => fav.vehicleId === vehicleId));
    }
  }, [favorites, vehicleId]);

  // Mutation para toggle
  const mutation = useMutation({
    mutationFn: async () => {
      if (isFavorited) {
        await favoritesApi.remove(vehicleId);
        return 'removed';
      } else {
        await favoritesApi.add(vehicleId);
        return 'added';
      }
    },
    onMutate: async () => {
      // Optimistic update
      setIsFavorited(!isFavorited);
    },
    onSuccess: (action) => {
      // Invalidar cache
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      
      toast.success(
        action === 'added'
          ? 'Veículo adicionado aos favoritos'
          : 'Veículo removido dos favoritos'
      );
    },
    onError: () => {
      // Reverter optimistic update
      setIsFavorited(!isFavorited);
      toast.error('Erro ao atualizar favoritos');
    },
  });

  const toggle = () => {
    if (!isAuthenticated) {
      toast.error('Faça login para favoritar veículos');
      return;
    }
    mutation.mutate();
  };

  return {
    isFavorited,
    toggle,
    isLoading: mutation.isPending,
  };
}
```

### useChat Hook

```typescript
// lib/hooks/useChat.ts
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';
import type { Message, Conversation } from '@/lib/types/message';

export function useChat(conversationId: string) {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Conectar ao WebSocket
  useEffect(() => {
    if (!token || !conversationId) return;

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

    // Carregar mensagens existentes
    socketInstance.on('conversation:loaded', (data: Message[]) => {
      setMessages(data);
      setIsLoading(false);
    });

    // Nova mensagem recebida
    socketInstance.on('message:received', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      
      // Auto-marcar como lida
      socketInstance.emit('message:read', { messageId: message.id });
    });

    // Confirmação de mensagem enviada
    socketInstance.on('message:sent', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Alguém está digitando
    socketInstance.on('user:typing', () => {
      setIsTyping(true);
    });

    socketInstance.on('user:stopped-typing', () => {
      setIsTyping(false);
    });

    // Mensagem marcada como lida
    socketInstance.on('message:read', ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, conversationId]);

  // Enviar mensagem
  const sendMessage = useCallback(
    (content: string, isProposal = false, amount?: number) => {
      if (!socket || !content.trim()) return;

      socket.emit('message:send', {
        conversationId,
        content: content.trim(),
        isProposal,
        proposalAmount: amount,
      });
    },
    [socket, conversationId]
  );

  // Indicadores de digitação
  let typingTimeout: NodeJS.Timeout;

  const startTyping = useCallback(() => {
    if (!socket) return;

    socket.emit('typing:start', { conversationId });

    // Auto-stop após 3 segundos
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('typing:stop', { conversationId });
    }, 3000);
  }, [socket, conversationId]);

  const stopTyping = useCallback(() => {
    if (!socket) return;
    clearTimeout(typingTimeout);
    socket.emit('typing:stop', { conversationId });
  }, [socket, conversationId]);

  return {
    messages,
    sendMessage,
    isTyping,
    isConnected,
    isLoading,
    startTyping,
    stopTyping,
  };
}
```

---

## 6. Utility Functions

### Formatters

```typescript
// lib/utils/formatters.ts

export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'agora mesmo';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  }

  return formatDate(dateObj);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens múltiplos
    .trim();
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}

export function maskCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function maskCNPJ(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
```

---

Este arquivo fornece exemplos práticos e prontos para uso que podem ser copiados diretamente para o projeto durante o desenvolvimento.