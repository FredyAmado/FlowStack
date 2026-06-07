import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { contactLimiter, checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(1, "Nombre requerido").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().max(50).optional().nullable(),
  company: z.string().max(200).optional().nullable(),
  message: z.string().min(1, "Mensaje requerido").max(5000),
  source: z.string().max(50).optional().default("web"),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  const rateCheck = checkRateLimit(req, contactLimiter);
  if (!rateCheck.ok) {
    return NextResponse.json(
      { error: "Demasiados envíos. Intenta en un minuto." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rateCheck.resetIn / 1000)) } }
    );
  }

  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, message, source } = parsed.data;

    await prisma.contactSubmission.create({
      data: { name, email, phone: phone || null, company: company || null, message, source },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
