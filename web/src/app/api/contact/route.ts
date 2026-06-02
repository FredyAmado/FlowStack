import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, phone, company, message, source: source || "web" },
    });

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (token && chatId) {
      const text = [
        "*Nuevo contacto desde automate.ai*",
        "",
        `*Nombre:* ${name}`,
        `*Email:* ${email}`,
        `*Teléfono:* ${phone || "—"}`,
        `*Empresa:* ${company || "—"}`,
        `*Mensaje:* ${message}`,
      ].join("\n");

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: Number(chatId), text, parse_mode: "Markdown" }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
