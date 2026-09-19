# Guia de Implementação Prática
## Marketplace de Veículos

---

## 1. Checklist de Setup Inicial

### 1.1 Configuração de Repositórios

```bash
# Estrutura de repositórios
marketplace-veiculos/
├── frontend/          # Repositório Next.js
├── backend/           # Repositório NestJS
└── infrastructure/    # IaC (Terraform/Pulumi)
```

#### Tasks Iniciais

- [ ] **Criar repositórios no GitHub**
  ```bash
  gh repo create marketplace-frontend --private
  gh repo create marketplace-backend --private
  gh repo create marketplace-infra --private
  ```

- [ ] **Configurar branch protection rules**
  - `main` requer PR review
  - `main` requer CI passing
  - `main` requer atualização com base
  - Não permitir force push

- [ ] **Setup de CI/CD**
  - GitHub Actions configurado
  - Secrets configurados
  - Ambientes (dev, staging, prod) criados

- [ ] **Setup de ferramentas de colaboração**
  - Slack/Discord para comunicação
  - Linear/Jira para task management
  - Figma para design
  - Notion/Confluence para docs

---

## 2. Setup do Backend (NestJS)

### 2.1 Inicialização do Projeto

```bash
# Instalar Nest CLI
npm i -g @nestjs/cli

# Criar projeto
nest new backend --package-manager npm

# Entrar no diretório
cd backend

# Instalar dependências essenciais
npm install --save \
  @nestjs/config \
  @nestjs/jwt \
  @nestjs/passport \
  passport-jwt \
  passport-local \
  @nestjs/websockets \
  @nestjs/platform-socket.io \
  socket.io \
  @prisma/client \
  bcrypt \
  class-validator \
  class-transformer \
  @aws-sdk/client-s3 \
  sharp \
  redis \
  cache-manager \
  cache-manager-redis-store

npm install --save-dev \
  @types/passport-jwt \
  @types/passport-local \
  @types/bcrypt \
  @types/multer \
  prisma \
  @nestjs/testing \
  jest \
  supertest
```

### 2.2 Estrutura de Pastas Recomendada

```bash
src/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   └── pipes/
├── config/
│   └── *.config.ts
├── modules/
│   ├── auth/
│   ├── users/
│   ├── vehicles/
│   ├── messages/
│   └── uploads/
├── database/
│   ├── prisma.service.ts
│   └── schema.prisma
└── main.ts
```

### 2.3 Configuração Prisma

```bash
# Inicializar Prisma
npx prisma init

# Editar .env com DATABASE_URL
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/marketplace?schema=public"' > .env

# Criar schema inicial (schema.prisma)
# (usar modelo do PLANO_PROJETO.md)

# Gerar migration
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### 2.4 Docker Compose para Desenvolvimento Local

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: marketplace-db
    environment:
      POSTGRES_USER: marketplace
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: marketplace
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: marketplace-redis
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  mailhog:
    image: mailhog/mailhog
    container_name: marketplace-mailhog
    ports:
      - '1025:1025'  # SMTP
      - '8025:8025'  # Web UI

volumes:
  postgres_data:
  redis_data:
```

```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### 2.5 Variáveis de Ambiente (.env.example)

```bash
# Database
DATABASE_URL="postgresql://marketplace:dev_password@localhost:5432/marketplace?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
JWT_REFRESH_EXPIRES_IN="7d"

# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="marketplace-uploads"

# Redis
REDIS_HOST="localhost"
REDIS_PORT="6379"

# App
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# Email (Desenvolvimento)
SMTP_HOST="localhost"
SMTP_PORT="1025"
SMTP_USER=""
SMTP_PASSWORD=""

# OAuth (Google)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/api/auth/google/callback"
```

---

## 3. Setup do Frontend (Next.js)

### 3.1 Inicialização do Projeto

```bash
# Criar projeto Next.js com TypeScript
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd frontend

# Instalar dependências
npm install \
  axios \
  @tanstack/react-query \
  zustand \
  react-hook-form \
  zod \
  socket.io-client \
  clsx \
  tailwind-merge \
  lucide-react \
  date-fns

npm install --save-dev \
  @types/node \
  prettier \
  eslint-config-prettier \
  @playwright/test
```

### 3.2 Setup shadcn/ui

```bash
# Inicializar shadcn/ui
npx shadcn-ui@latest init

# Instalar componentes base
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add checkbox
```

### 3.3 Estrutura de Pastas

```bash
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── vehicles/
│   │   ├── [id]/
│   │   └── new/
│   ├── profile/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui
│   ├── layout/
│   ├── vehicle/
│   ├── forms/
│   └── shared/
├── lib/
│   ├── api/
│   ├── hooks/
│   ├── store/
│   ├── utils/
│   └── types/
└── styles/
    └── globals.css
```

### 3.4 Configuração de Environment (.env.local)

```bash
# API
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="ws://localhost:3001"

# OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-client-id"

# Analytics (Produção)
# NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Sentry (Produção)
# NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
```

### 3.5 next.config.js Otimizado

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'marketplace-uploads.s3.amazonaws.com',
      // Adicionar domínios conforme necessário
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Strict mode para catching bugs
  reactStrictMode: true,
  
  // Compressão
  compress: true,
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Rewrites para API (opcional)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 4. Segurança - Checklist Detalhado

### 4.1 Autenticação e Autorização

#### Backend

```typescript
// auth.guard.ts - JWT Guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
    return user;
  }
}

// roles.guard.ts - RBAC Guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}

// Uso em controllers
@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiclesController {
  @Post()
  @Roles(Role.SELLER, Role.DEALERSHIP)
  create(@CurrentUser() user: User, @Body() dto: CreateVehicleDto) {
    // Apenas vendedores podem criar anúncios
  }
}
```

#### Frontend

```typescript
// lib/api/client.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );
        
        localStorage.setItem('access_token', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh falhou, redirecionar para login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

### 4.2 Proteção contra Ataques

#### SQL Injection

```typescript
// ❌ NUNCA FAÇA ISSO
const vehicles = await prisma.$queryRaw`
  SELECT * FROM vehicles WHERE brand = ${userInput}
`;

// ✅ USE PREPARED STATEMENTS (Prisma faz automaticamente)
const vehicles = await prisma.vehicle.findMany({
  where: { brand: userInput }
});

// ✅ Se usar queryRaw, use parâmetros
const vehicles = await prisma.$queryRaw`
  SELECT * FROM vehicles WHERE brand = ${Prisma.raw(sanitize(userInput))}
`;
```

#### XSS (Cross-Site Scripting)

```typescript
// Backend: Sanitização
import { sanitize } from 'class-sanitizer';

export class CreateVehicleDto {
  @IsString()
  @Transform(({ value }) => sanitize(value))
  description: string;
}

// Frontend: Escape de HTML
import DOMPurify from 'dompurify';

function VehicleDescription({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// Ou use apenas texto
function VehicleDescription({ text }: { text: string }) {
  return <div>{text}</div>; // React escapa automaticamente
}
```

#### CSRF (Cross-Site Request Forgery)

```typescript
// Backend: CSRF Protection
import * as csurf from 'csurf';

// main.ts
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Endpoint para obter token
@Get('csrf-token')
getCsrfToken(@Req() req: Request) {
  return { csrfToken: req.csrfToken() };
}

// Frontend: Incluir token em requests
const csrfToken = await fetchCsrfToken();

axios.post('/api/vehicles', data, {
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});
```

#### Rate Limiting

```typescript
// Backend: ThrottlerModule
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10, // 10 requests por minuto
    }),
  ],
})
export class AppModule {}

// Customizar por rota
@Controller('auth')
export class AuthController {
  @Post('login')
  @Throttle(5, 60) // 5 tentativas por minuto
  login(@Body() dto: LoginDto) {
    // ...
  }
}
```

### 4.3 Proteção de Dados Sensíveis

#### Hash de Senhas

```typescript
// users.service.ts
import * as bcrypt from 'bcrypt';

async create(dto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 12);
  
  return this.prisma.user.create({
    data: {
      ...dto,
      password: hashedPassword,
    },
  });
}

async validatePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
```

#### Mascaramento de Dados

```typescript
// Ocultar parte da placa
function maskPlate(plate: string): string {
  return plate.substring(0, 4) + '***';
}

// Ocultar parte do email
function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  return `${name.substring(0, 2)}***@${domain}`;
}

// Ocultar parte do telefone
function maskPhone(phone: string): string {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3');
}
```

#### Criptografia de Dados em Repouso

```typescript
// config/encryption.config.ts
import * as crypto from 'crypto';

export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Uso para dados sensíveis
@Column({ type: 'text' })
get cpf(): string {
  return this.encryptionService.decrypt(this._cpf);
}

set cpf(value: string) {
  this._cpf = this.encryptionService.encrypt(value);
}
```

### 4.4 HTTPS e Certificados

```bash
# Desenvolvimento local com mkcert
brew install mkcert
mkcert -install
mkcert localhost

# Usar no Next.js
# package.json
{
  "scripts": {
    "dev": "next dev --experimental-https"
  }
}

# Produção: Let's Encrypt (Certbot)
sudo certbot certonly --webroot \
  -w /var/www/html \
  -d example.com \
  -d www.example.com

# Renovação automática
sudo certbot renew --dry-run
```

### 4.5 Headers de Segurança

```typescript
// Backend (NestJS)
import helmet from 'helmet';

// main.ts
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));

// CORS configurado
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});
```

### 4.6 Auditoria e Logging

```typescript
// logging.interceptor.ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const now = Date.now();

    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        const contentLength = res.get('content-length');
        
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} +${Date.now() - now}ms`
        );
        
        // Log de ações sensíveis
        if (this.isSensitiveAction(method, url)) {
          this.auditLog({
            userId: req.user?.id,
            action: `${method} ${url}`,
            ip,
            timestamp: new Date(),
            data: this.sanitizeData(data),
          });
        }
      }),
    );
  }

  private isSensitiveAction(method: string, url: string): boolean {
    const sensitivePatterns = [
      /\/users\/\d+/,
      /\/vehicles\/\d+/,
      /\/auth\//,
    ];
    
    return sensitivePatterns.some((pattern) => pattern.test(url));
  }

  private async auditLog(entry: AuditLogEntry) {
    // Salvar em tabela de auditoria
    await this.prisma.auditLog.create({ data: entry });
  }
}
```

---

## 5. Testes

### 5.1 Backend - Testes Unitários (Jest)

```typescript
// vehicles.service.spec.ts
describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: VehiclesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: VehiclesRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get<VehiclesRepository>(VehiclesRepository);
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const dto: CreateVehicleDto = {
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        price: 45900,
        // ...
      };

      const expected = { id: '1', ...dto };
      jest.spyOn(repository, 'create').mockResolvedValue(expected);

      const result = await service.create('userId', dto);

      expect(result).toEqual(expected);
      expect(repository.create).toHaveBeenCalledWith({
        ...dto,
        sellerId: 'userId',
      });
    });

    it('should throw error if price is negative', async () => {
      const dto: CreateVehicleDto = {
        price: -1000,
        // ...
      };

      await expect(service.create('userId', dto)).rejects.toThrow(
        'Preço deve ser positivo'
      );
    });
  });
});

// Executar testes
npm test
npm test -- --coverage
```

### 5.2 Backend - Testes de Integração

```typescript
// vehicles.e2e-spec.ts
describe('Vehicles (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Autenticar
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    
    authToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/vehicles (POST) should create vehicle', () => {
    return request(app.getHttpServer())
      .post('/vehicles')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        price: 45900,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.brand).toBe('Honda');
      });
  });

  it('/vehicles (GET) should return vehicles', () => {
    return request(app.getHttpServer())
      .get('/vehicles')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });
});
```

### 5.3 Frontend - Testes com Playwright

```typescript
// tests/e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Vehicle Search', () => {
  test('should search and display results', async ({ page }) => {
    await page.goto('/');

    // Preencher busca
    await page.fill('input[placeholder*="marca"]', 'Honda');
    await page.selectOption('select[name="year"]', '2020');
    await page.click('button:has-text("Buscar")');

    // Aguardar resultados
    await page.waitForSelector('.vehicle-card');

    // Verificar resultados
    const cards = await page.locator('.vehicle-card').count();
    expect(cards).toBeGreaterThan(0);

    // Verificar conteúdo do primeiro card
    const firstCard = page.locator('.vehicle-card').first();
    await expect(firstCard).toContainText('Honda');
    await expect(firstCard).toContainText('2020');
  });

  test('should filter by price range', async ({ page }) => {
    await page.goto('/vehicles');

    // Abrir filtros
    await page.click('button:has-text("Filtros")');

    // Ajustar slider de preço
    await page.fill('input[name="minPrice"]', '40000');
    await page.fill('input[name="maxPrice"]', '50000');

    // Aplicar filtros
    await page.click('button:has-text("Aplicar")');

    // Verificar que todos resultados estão na faixa
    const prices = await page.locator('.vehicle-price').allTextContents();
    prices.forEach((priceText) => {
      const price = parseFloat(priceText.replace(/[^\d]/g, ''));
      expect(price).toBeGreaterThanOrEqual(40000);
      expect(price).toBeLessThanOrEqual(50000);
    });
  });
});

// Executar testes
npx playwright test
npx playwright test --ui
npx playwright show-report
```

---

## 6. Deploy

### 6.1 Frontend (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Produção
vercel --prod

# Configurar variáveis de ambiente na dashboard
# https://vercel.com/your-project/settings/environment-variables
```

### 6.2 Backend (Railway / Render)

#### Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Criar projeto
railway init

# Deploy
railway up

# Variáveis de ambiente
railway variables set DATABASE_URL="postgresql://..."
railway variables set JWT_SECRET="..."
```

#### Render (alternativa)

```yaml
# render.yaml
services:
  - type: web
    name: marketplace-api
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production
```

### 6.3 Database (AWS RDS / Supabase)

#### Supabase (mais simples)

```bash
# Criar projeto em https://supabase.com
# Copiar DATABASE_URL do dashboard

# Atualizar .env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Rodar migrations
npx prisma migrate deploy
```

#### AWS RDS (mais controle)

```bash
# Criar via AWS Console ou Terraform
# Configurar security groups para permitir acesso

# Connection string
DATABASE_URL="postgresql://admin:[PASSWORD]@marketplace-db.xxx.us-east-1.rds.amazonaws.com:5432/marketplace"
```

### 6.4 CI/CD com GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        working-directory: backend
        run: npm ci
      
      - name: Run tests
        working-directory: backend
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: frontend
        run: npm ci
      
      - name: Run linting
        working-directory: frontend
        run: npm run lint
      
      - name: Run type check
        working-directory: frontend
        run: npm run type-check
      
      - name: Run tests
        working-directory: frontend
        run: npm test
      
      - name: Build
        working-directory: frontend
        run: npm run build

  deploy-staging:
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Staging
        run: |
          # Deploy backend
          # Deploy frontend
          echo "Deploy to staging"

  deploy-production:
    needs: [test-backend, test-frontend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Production
        run: |
          # Deploy backend
          # Deploy frontend
          echo "Deploy to production"
```

---

## 7. Monitoramento

### 7.1 Setup Sentry (Error Tracking)

```bash
# Backend
npm install @sentry/node

# main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// Frontend
npm install @sentry/nextjs

# sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 7.2 Analytics (Google Analytics / Plausible)

```typescript
// lib/analytics.ts
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Uso
event({
  action: 'vehicle_view',
  category: 'engagement',
  label: vehicleId,
});
```

---

## 8. Checklist Pré-Launch

### 8.1 Técnico

- [ ] **Performance**
  - [ ] Lighthouse Score > 90 (todas categorias)
  - [ ] Imagens otimizadas (WebP)
  - [ ] Code splitting implementado
  - [ ] Cache configurado
  - [ ] CDN configurado

- [ ] **Segurança**
  - [ ] HTTPS configurado
  - [ ] Headers de segurança
  - [ ] Rate limiting ativo
  - [ ] Inputs validados
  - [ ] SQL Injection testado
  - [ ] XSS testado
  - [ ] CSRF protection ativo

- [ ] **Testes**
  - [ ] Cobertura de testes > 80%
  - [ ] E2E tests passando
  - [ ] Load testing realizado
  - [ ] Penetration testing realizado

- [ ] **Infraestrutura**
  - [ ] Backups automáticos configurados
  - [ ] Monitoramento ativo
  - [ ] Alertas configurados
  - [ ] Logs centralizados
  - [ ] SSL/TLS válido

### 8.2 Legal e Compliance

- [ ] **LGPD**
  - [ ] Política de privacidade publicada
  - [ ] Termos de uso publicados
  - [ ] Consentimento de cookies
  - [ ] DPO designado
  - [ ] Processo de exclusão de dados

- [ ] **Documentação**
  - [ ] API documentada (Swagger)
  - [ ] README atualizado
  - [ ] Guias de uso
  - [ ] FAQ criado

### 8.3 UX/UI

- [ ] **Acessibilidade**
  - [ ] WCAG 2.1 AA compliance
  - [ ] Navegação por teclado
  - [ ] Screen reader testado
  - [ ] Contraste adequado

- [ ] **Responsividade**
  - [ ] Testado em iOS Safari
  - [ ] Testado em Android Chrome
  - [ ] Testado em tablets
  - [ ] Testado em desktop

- [ ] **Conteúdo**
  - [ ] Textos revisados
  - [ ] Imagens otimizadas
  - [ ] Meta tags SEO
  - [ ] Open Graph tags

---

## 9. Próximos Passos Imediatos

### Semana 1: Setup
1. Criar repositórios
2. Configurar ambientes de desenvolvimento
3. Setup de Docker Compose
4. Inicializar projetos (NestJS + Next.js)
5. Setup de CI/CD básico

### Semana 2-3: Backend Core
1. Configurar Prisma + Database
2. Implementar autenticação
3. Implementar CRUD de usuários
4. Implementar CRUD de veículos
5. Setup de testes unitários

### Semana 4-5: Frontend Core
1. Setup Next.js + shadcn/ui
2. Criar layout principal
3. Implementar páginas de auth
4. Implementar listagem de veículos
5. Implementar detalhes de veículo

### Semana 6-7: Features Avançadas
1. Sistema de mensagens (WebSocket)
2. Upload de imagens
3. Sistema de favoritos
4. Busca e filtros avançados
5. Testes E2E

### Semana 8: Polimento e Deploy
1. Correção de bugs
2. Otimizações de performance
3. Setup de monitoramento
4. Deploy em staging
5. Testes finais

---

Este guia fornece um roteiro prático e acionável para iniciar o desenvolvimento da plataforma com foco em qualidade, segurança e boas práticas desde o início.