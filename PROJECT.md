# automate.ai — Automatización de Procesos Administrativos

Plataforma web para automatización de procesos administrativos con flujos de aprobación multi-paso, más consultoría de automatización empresarial.

---

## Estructura del Proyecto

```
automate.ai/
├── .opencode/
│   ├── agents/
│   │   ├── web-expert.md          # Agente desarrollador web
│   │   └── ceo-coach.md           # Agente estrategia de negocio
│   └── skills/
│       ├── web-expert/SKILL.md
│       └── ceo-coach/SKILL.md
├── web/                           # Aplicación Next.js 16
│   ├── prisma/
│   │   ├── schema.prisma          # 6 modelos (PostgreSQL)
│   │   ├── seed.ts                # Datos demo
│   │   └── migrations/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Layout raíz
│   │   │   ├── page.tsx           # Landing page corporativa
│   │   │   ├── providers.tsx      # SessionProvider
│   │   │   ├── globals.css        # Tailwind v4 + animaciones
│   │   │   ├── login/page.tsx     # Login con credenciales
│   │   │   ├── demo/page.tsx      # Walkthrough interactivo
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx     # Sidebar negro/naranja
│   │   │   │   ├── page.tsx       # KPIs + Recharts
│   │   │   │   ├── processes/     # CRUD procesos
│   │   │   │   ├── tasks/         # Bandeja aprobaciones
│   │   │   │   ├── history/       # Línea de tiempo
│   │   │   │   └── contactos/     # Leads recibidos
│   │   │   └── api/
│   │   │       ├── auth/[...nextauth]/route.ts
│   │   │       ├── processes/route.ts
│   │   │       ├── requests/route.ts
│   │   │       ├── approvals/route.ts
│   │   │       ├── contact/route.ts     # Guarda leads + Telegram
│   │   │       └── chat/route.ts        # IA chatbot (OpenRouter)
│   │   └── lib/
│   │       ├── prisma.ts          # Neon/PostgreSQL adapter
│   │       ├── auth.ts            # NextAuth config
│   │       └── cn.ts
│   ├── components/
│   │   ├── AutomationIllustration.tsx   # SVG personalizado
│   │   └── ChatBot.tsx            # Chat flotante con IA
│   ├── public/images/
│   │   ├── hero-bg.jpg
│   │   ├── team.jpg
│   │   └── (capturas diseño)
│   ├── vercel.json
│   └── .env
├── VIDEO_SCRIPT.md
└── PROJECT.md
```

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router) + Turbopack |
| UI | Tailwind CSS v4 + Lucide React |
| Backend | Next.js API Routes |
| Base de Datos | PostgreSQL (Neon) + Prisma ORM v7 |
| Autenticación | NextAuth.js v4 (Credentials + JWT) |
| Gráficos | Recharts |
| Chatbot IA | OpenRouter + Llama 3.1 8B |
| Notificaciones | Telegram Bot API |
| Despliegue | Vercel |

---

## Funcionalidades

### Landing Page Corporativa
- Navbar fijo con navegación suave
- Hero con imagen de fondo + formulario de contacto
- Banner de estadísticas (15+ años, 500+ empresas, etc.)
- Misión, Visión, Valores + FODA (SWOT 2×2)
- 6 tarjetas de servicios con hover animado
- Sección de precios (Starter/Professional/Enterprise)
- Testimonios con avatares y ratings
- Chatbot flotante con IA (esquina inferior derecha)
- Footer con enlaces

### Dashboard
- KPIs: procesos activos, solicitudes totales, tareas pendientes, completadas hoy
- Gráfico de donut: solicitudes por estado
- Gráfico de barras: solicitudes por mes
- Actividad reciente

### Gestión de Procesos
- CRUD completo (crear, listar, eliminar)
- Nombre, descripción, pasos de aprobación

### Bandeja de Tareas
- Aprobación/rechazo multi-paso con comentarios
- Filtros: todas, pendientes, hechas
- Flujo automático al siguiente revisor

### Historial
- Línea de tiempo con toda la actividad
- Iconos y colores por tipo de acción

### Contactos (CRM)
- Lista de leads del formulario y chatbot
- Vista detalle con datos completos
- Botón para responder por email

### Chatbot con IA (Ventas)
- Agente de ventas automatizado con Llama 3.1
- Conoce todos los servicios y planes
- Califica leads (nombre, empresa, cargo, necesidad)
- Ofrece agendar demo/llamada
- Guarda conversaciones en base de datos
- Notifica por Telegram

---

## Modelos de Datos

- **User** — autenticación y roles (admin/user) con enum PostgreSQL
- **Process** — flujo de automatización con N pasos
- **Request** — solicitud vinculada a un proceso
- **Approval** — aprobación por paso y usuario
- **ActivityLog** — auditoría de acciones
- **ContactSubmission** — leads del formulario y chatbot

---

## Servicios de Automatización (Consultoría)

- **Make** (Integromat) — automatización visual
- **n8n** — automatización self-hosted
- **Google Workspace** — Apps Script, Sheets, Forms, Drive
- **Microsoft Power Automate** — ecosistema Microsoft
- **Zapier** — low-code con cientos de apps
- **WhatsApp Business API** — chatbots y notificaciones
- **Telegram Bots** — asistentes automatizados
- **Desarrollo a medida** — programación personalizada

---

## Planes de la Plataforma

| Plan | Precio | Límites |
|---|---|---|
| Starter | $0/mes | 3 procesos, 10 solicitudes/mes, 1 usuario |
| Professional | $29/mes | Procesos ilimitados, 500 solicitudes, 10 usuarios |
| Enterprise | Personalizado | Ilimitado, API, SLA 99.9%, soporte 24/7 |

---

## Usuarios Demo

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@automate.ai | admin123 |
| Usuario | user@automate.ai | user123 |

---

## Comandos Útiles

```bash
cd web

npm run dev              # Desarrollo localhost:3000
npm run build            # Build producción
npm start                # Servidor producción

npx prisma migrate dev   # Crear migración
npx prisma db seed       # Poblar datos demo
npx prisma studio        # Explorar BD
```

---

## Variables de Entorno (Vercel)

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `TELEGRAM_BOT_TOKEN` | Token del bot de Telegram |
| `TELEGRAM_CHAT_ID` | Chat ID para notificaciones |
| `OPENROUTER_API_KEY` | API key para IA del chatbot |

---

## Colores Corporativos

| Color | Hex | Uso |
|---|---|---|
| Naranja | `#ff6b00` | Botones, acentos, iconos |
| Naranja claro | `#ff8c38` | Hover states |
| Naranja oscuro | `#e06000` | Degradados |
| Negro | `#0a0a0a` | Fondos, navbar, sidebar |
| Blanco | `#ffffff` | Fondos de contenido, tarjetas |

---

## Historial de Cambios

| Fecha | Cambio |
|---|---|
| 2026-05-30 | Creación del proyecto Next.js + Tailwind + Prisma SQLite |
| 2026-05-30 | Autenticación NextAuth + Dashboard KPIs + CRUD procesos |
| 2026-05-30 | Bandeja de aprobaciones multi-paso + Historial |
| 2026-05-30 | Agentes opencode (web-expert, ceo-coach) |
| 2026-05-31 | Landing page corporativa completa |
| 2026-05-31 | Página /demo interactiva + AutomationIllustration + Unsplash |
| 2026-06-01 | Tarjetas de servicios rediseñadas + Sección de precios |
| 2026-06-01 | Repositorio GitHub + despliegue Vercel |
| 2026-06-01 | Integración Telegram para notificaciones de leads |
| 2026-06-01 | Chatbot flotante (widget UI) |
| 2026-06-02 | Migración SQLite → PostgreSQL (Neon) |
| 2026-06-02 | Modelo ContactSubmission + leads guardados en BD |
| 2026-06-02 | Dashboard de contactos (CRM interno) |
| 2026-06-02 | Chatbot con IA (OpenRouter + Llama 3.1) como agente de ventas |
