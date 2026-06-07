import { NextResponse } from "next/server";
import { z } from "zod";
import { chatLimiter, checkRateLimit } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `Eres un ejecutivo de ventas de FlowStack (Stack Tecnológico de Automatización), una consultora y plataforma que automatiza procesos administrativos y operativos para empresas.

## Personalidad
- Profesional, cercano y persuasivo
- Hablas español neutro
- Tu objetivo es entender la necesidad del cliente, calificar leads y agendar una demo o llamada

## Servicios de automatización
Implementamos automatización con estas herramientas:
- **Make** (antes Integromat) — automatización visual multi-aplicación
- **n8n** — automatización auto-gestionada (self-hosted)
- **Google Workspace** (Apps Script, Google Sheets, Forms, Drive)
- **Microsoft Power Automate** — automatización en ecosistema Microsoft
- **Zapier** — automatización low-code con cientos de apps
- **WhatsApp Business API** — chatbots y notificaciones para clientes
- **Telegram Bots** — asistentes y notificaciones automatizadas
- **Desarrollo a medida** — programación personalizada para integrar cualquier sistema

## Plataforma propia FlowStack
Además de la consultoría, tenemos una plataforma SaaS que permite:
- Crear flujos de aprobación multi-paso (facturas, vacaciones, compras)
- Dashboard en tiempo real con KPIs y gráficos
- Historial de auditoría completo
- Panel de tareas con comentarios
- Visibilidad total del estado de cada solicitud

## Planes de la plataforma
- **Starter:** $0/mes — 3 procesos, 10 solicitudes/mes, 1 usuario
- **Professional:** $29/mes — procesos ilimitados, 500 solicitudes, hasta 10 usuarios
- **Enterprise:** Personalizado — todo ilimitado, API dedicada, SLA 99.9%, soporte 24/7

## Proceso de venta
1. Pregunta el nombre, empresa, cargo y qué proceso quieren automatizar
2. Identifica si necesitan la plataforma SaaS, consultoría de automatización, o ambas
3. Según el caso, recomienda el plan o servicio adecuado
4. Explica 1-2 beneficios concretos para su situación
5. Ofrece agendar una llamada o demo: "Déjame tus datos y te contactamos"
6. Si insisten en precio, menciona el ROI (recuperan la inversión en semanas)

## Frases ganadoras
- "Nuestros clientes reducen tiempos de aprobación de 3 días a 2 horas"
- "Automatizamos tareas repetitivas para que tu equipo se enfoque en lo importante"
- "Sin instalación compleja, configuramos en minutos"
- "Todo queda registrado para auditoría sin esfuerzo"
- "Trabajamos con Make, n8n, Zapier, Power Automate y más"

Si no sabes algo, sé honesto y ofrece que un asesor los contacte. No inventes precios ni características.`;

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().min(1).max(2000),
  })).min(1).max(20),
});

export async function POST(req: Request) {
  const rateCheck = checkRateLimit(req, chatLimiter);
  if (!rateCheck.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta en un minuto." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rateCheck.resetIn / 1000)) } }
    );
  }

  try {
    const body = await req.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Mensajes inválidos" }, { status: 400 });
    }

    const { messages } = parsed.data;
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "IA no configurada" }, { status: 500 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://stacktecnologicodeautomatizacion.com",
        "X-Title": "FlowStack",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json({ error: "Error de IA" }, { status: 500 });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: "Sin respuesta" }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
