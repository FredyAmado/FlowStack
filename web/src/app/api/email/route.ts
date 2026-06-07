import { NextResponse } from "next/server";
import { z } from "zod";
import { ipLimiter, checkRateLimit } from "@/lib/rate-limit";

const emailSchema = z.object({
  to: z.string().email("Email inválido"),
  subject: z.string().min(1, "Asunto requerido").max(200),
  text: z.string().min(1, "Mensaje requerido").max(5000),
  html: z.string().optional(),
});

export async function POST(request: Request) {
  const rateCheck = checkRateLimit(request, ipLimiter);
  if (!rateCheck.ok) {
    return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = emailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { to, subject, text, html } = parsed.data;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("Email: SMTP not configured, skipping send");
    return NextResponse.json(
      { success: true, note: "modo desarrollo — email no enviado" }
    );
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"FlowStack" <${user}>`,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br>"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Error al enviar el email" },
      { status: 500 }
    );
  }
}
