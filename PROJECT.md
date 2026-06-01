# AutoPro - Automatización de Procesos

Sistema web para automatización de procesos administrativos con flujos de aprobación multi-paso.

---

## Estructura del Proyecto

```
automate.ai/
├── .opencode/
│   ├── agents/
│   │   └── web-expert.md        # Agente web-expert para opencode
│   └── skills/
│       └── web-expert/
│           └── SKILL.md         # Skill de desarrollo web senior
├── web/                          # Aplicación Next.js
│   ├── prisma/
│   │   ├── schema.prisma        # Modelos de base de datos
│   │   ├── seed.ts              # Datos de prueba
│   │   ├── dev.db               # Base de datos SQLite
│   │   └── migrations/          # Migraciones de Prisma
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Layout raíz con Providers
│   │   │   ├── page.tsx         # Redirección según sesión
│   │   │   ├── providers.tsx    # SessionProvider client component
│   │   │   ├── globals.css      # Estilos globales + Tailwind
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Login con credenciales
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx   # Sidebar de navegación
│   │   │   │   ├── page.tsx     # KPIs, gráficos (Recharts)
│   │   │   │   ├── processes/   # CRUD de procesos
│   │   │   │   ├── tasks/       # Bandeja de aprobaciones
│   │   │   │   └── history/     # Historial de actividad
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       │   └── [...nextauth]/route.ts
│   │   │       ├── processes/route.ts
│   │   │       ├── requests/route.ts
│   │   │       └── approvals/route.ts
│   │   └── lib/
│   │       ├── prisma.ts
│   │       ├── auth.ts
│   │       └── cn.ts
│   ├── prisma.config.ts
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── package.json
│   └── tsconfig.json
├── .vscode/
└── PROJECT.md                    # Este archivo
```

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router) |
| UI | Tailwind CSS v4 + Lucide React |
| Backend | Next.js API Routes |
| Base de Datos | SQLite + Prisma ORM v7 |
| Autenticación | NextAuth.js v4 (Credentials) |
| Gráficos | Recharts |
| Íconos | Lucide React |

---

## Funcionalidades

### 1. Dashboard
- KPIs: procesos activos, solicitudes totales, tareas pendientes, completadas hoy
- Gráfico de donut: solicitudes por estado
- Gráfico de barras: solicitudes por mes
- Actividad reciente

### 2. Gestión de Procesos
- Crear procesos con nombre, descripción y número de pasos de aprobación
- Listar y eliminar procesos
- Cada proceso puede tener N pasos de aprobación

### 3. Bandeja de Tareas
- Ver tareas pendientes de aprobación asignadas al usuario
- Aprobar o rechazar con comentario
- Filtros: todas, pendientes, hechas
- Flujo multi-paso: al aprobar, pasa al siguiente revisor automáticamente

### 4. Historial
- Línea de tiempo con toda la actividad del sistema
- Iconos y colores según tipo de acción

---

## Modelos de Datos

- **User**: autenticación y roles (admin/user)
- **Process**: flujo de automatización con N pasos
- **Request**: solicitud vinculada a un proceso
- **Approval**: aprobación por paso y usuario
- **ActivityLog**: auditoría de acciones

---

## Usuarios Demo

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@autopro.com | admin123 |
| Usuario | user@autopro.com | user123 |

---

## Comandos Útiles

```bash
# Desarrollo
cd web
npm run dev                   # Iniciar servidor en localhost:3000

# Base de datos
npx prisma studio             # Explorar BD en navegador
npx prisma migrate dev        # Crear migración
npx prisma db seed            # Poblar con datos demo

# Build
npm run build                 # Compilar para producción
npm start                     # Iniciar servidor de producción
```

---

## Landing Page

Página de inicio corporativa para **automate.ai** con diseño profesional estilo Chetu, usando la paleta de colores Bodytech (naranja, negro, blanco).

### Secciones
1. **Navbar** — menú fijo con enlaces de navegación y botón de inicio de sesión
2. **Hero** — titular principal, texto descriptivo, formulario de contacto (lado derecho)
3. **Stats Banner** — contadores (15+ años, 500+ empresas, 50K+ procesos, 99.9% uptime)
4. **Nosotros** — Misión, Visión, Valores + Objetivos Estratégicos
5. **Servicios** — 6 tarjetas de servicios con íconos
6. **Casos de éxito** — testimonios de clientes con rating
7. **CTA Final** — banner con llamado a la acción (solicitar demo / llamar)
8. **Footer** — enlaces legales y copyright

### Colores Corporativos
| Color | Hex | Uso |
|---|---|---|
| Naranja | `#ff6b00` | Botones, acentos, iconos |
| Naranja claro | `#ff8c38` | Hover states |
| Naranja oscuro | `#e06000` | Degradados |
| Negro | `#0a0a0a` | Fondos, navbar, sidebar |
| Blanco | `#ffffff` | Fondos de contenido, tarjetas |

### Formulario de Contacto
- Campos: Nombre, Correo, Teléfono, Empresa, Mensaje
- Validación y feedback visual al enviar
- Integrable con backend de email/CRM

## Historial de Cambios

| Fecha | Cambio |
|---|---|
| 2026-05-30 | Creación del proyecto Next.js + Tailwind |
| 2026-05-30 | Configuración de Prisma con SQLite |
| 2026-05-30 | Autenticación con NextAuth (credenciales) |
| 2026-05-30 | Dashboard con KPIs y gráficos Recharts |
| 2026-05-30 | CRUD de procesos de automatización |
| 2026-05-30 | Bandeja de aprobaciones multi-paso |
| 2026-05-30 | Historial de actividad / auditoría |
| 2026-05-30 | Seed de datos demo |
| 2026-05-30 | Skill y agente web-expert para opencode |
| 2026-05-31 | Landing page corporativa (misión, visión, valores, objetivos) |
| 2026-05-31 | Paleta de colores Bodytech (naranja, negro, blanco) |
| 2026-05-31 | Formulario de contacto en hero |
| 2026-05-31 | Dashboard adaptado a colores corporativos |
| 2026-05-31 | Guion profesional para video demo (VIDEO_SCRIPT.md) |
| 2026-05-31 | Página interactiva /demo con auto-reproducción |
| 2026-05-31 | Ilustración SVG personalizada (AutomationIllustration) |
| 2026-05-31 | Fotos reales Unsplash (hero-bg.jpg, team.jpg) |
| 2026-05-31 | Avatares generados para testimonios (ui-avatars.com) |
