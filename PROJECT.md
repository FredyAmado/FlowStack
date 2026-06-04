# FlowStack — Stack Tecnológico de Automatización

Plataforma SaaS para automatización de procesos administrativos con flujos de aprobación multi-paso, dashboards en tiempo real, y consultoría de automatización empresarial.

---

## Estructura del Proyecto

```
FlowStack/                 # Repo monorepo
├── .opencode/
│   ├── agents/
│   │   ├── web-expert.md
│   │   └── ceo-coach.md
│   └── skills/
├── web/                      # Aplicación Next.js 16
│   ├── prisma/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Landing FlowStack
│   │   │   ├── login/
│   │   │   ├── demo/
│   │   │   ├── dashboard/
│   │   │   └── api/
│   │   ├── components/
│   │   └── lib/
│   ├── public/images/
│   ├── tunnel.mjs            # Túnel SSH para OpenClaw
│   ├── ssh-exec.mjs          # Helper SSH para VPS
│   └── .env
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
| Despliegue | Vercel (flowstack.vercel.app) |

---

## Infraestructura

| Recurso | Detalle |
|---|---|
| VPS | RackNerd 1GB RAM, 19GB SSD, Ubuntu 24.04 (96.44.175.39) |
| Docker | n8n (5678), Coolify (8000) |
| OpenClaw | Gateway local (19001) + @osirys_bot |
| DNS/SSL | Cloudflare (stacktecnologicodeautomatizacion.com) |
| Dominio | stacktecnologicodeautomatizacion.com (Namecheap) |
| Vercel | flowstack-tawny.vercel.app |

---

## Funcionalidades

### Landing Page
- Navbar fijo + hero con formulario de contacto
- Misión, Visión, Valores + FODA
- 6 servicios, precios (Starter/Professional/Enterprise)
- Testimonios, chatbot IA, footer

### Dashboard
- KPIs, gráficos (Recharts), actividad reciente
- CRUD procesos, bandeja aprobaciones multi-paso
- Historial con auditoría, CRM de contactos/leads

### Chatbot IA
- Agente de ventas con Llama 3.1 vía OpenRouter
- Califica leads, agenda demos, guarda en BD

---

## Usuarios Demo

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@automate.ai | admin123 |
| Usuario | user@automate.ai | user123 |

---

## Historial de Cambios

| Fecha | Cambio |
|---|---|
| 2026-05-30 | Creación del proyecto Next.js + Tailwind + Prisma SQLite |
| 2026-05-30 | Autenticación NextAuth + Dashboard KPIs + CRUD procesos |
| 2026-05-30 | Bandeja de aprobaciones multi-paso + Historial |
| 2026-05-30 | Agentes opencode (web-expert, ceo-coach) |
| 2026-05-31 | Landing page corporativa completa |
| 2026-05-31 | Página /demo interactiva + AutomationIllustration |
| 2026-06-01 | Tarjetas de servicios + Sección de precios |
| 2026-06-01 | Repositorio GitHub + despliegue Vercel |
| 2026-06-01 | Integración Telegram para notificaciones |
| 2026-06-01 | Chatbot flotante |
| 2026-06-02 | Migración SQLite → PostgreSQL (Neon) |
| 2026-06-02 | CRM de contactos (dashboard leads) |
| 2026-06-02 | Chatbot IA con OpenRouter (agente ventas) |
| 2026-06-02 | VPS RackNerd + Docker + n8n + Coolify |
| 2026-06-02 | OpenClaw instalado + @osirys_bot |
| 2026-06-03 | **Rebrand: automate.ai → FlowStack** |
| 2026-06-03 | Dominio stacktecnologicodeautomatizacion.com |
| 2026-06-03 | Cloudflare DNS + SSL + Vercel domain |
| 2026-06-03 | Vercel project rename: automate-ai → flowstack |
| 2026-06-03 | **Nueva sección "Lo que el mercado busca"** entre Servicios y Casos de Éxito |
| 2026-06-03 | Servicios actualizados: Power Automate, RPA, Power BI, IA en descripciones |
| 2026-06-03 | Deploy a producción (stacktecnologicodeautomatizacion.com) |
| 2026-06-03 | Sección Mercado + enlace navbar desplegados |

---

## Pendientes

| Pendiente | Observación |
|-----------|-------------|
| **Correo corporativo** | Dominio en Namecheap, DNS en Cloudflare. Opciones: Namecheap Email (~$12/año), Google Workspace (~$6/mes), Cloudflare Email Routing (gratis → Gmail) |
| **WhatsApp Business** | App Business manual (gratis, celular) o API (pago, integrable al dashboard) |
| **design-cli** | CLI global para generar imágenes con IA desde terminal |
| **campaign-cli** | CLI global para marketing (copy + imágenes) |
| **Capacitaciones Fredy** | 4 módulos: Power Automate, Power BI, IA, Automatización integral |
