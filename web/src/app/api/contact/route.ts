import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ error: "Telegram no configurado" }, { status: 500 });
    }

    const text = [
      "*Nuevo contacto desde automate.ai*",
      "",
      `*Nombre:* ${name}`,
      `*Email:* ${email}`,
      `*Teléfono:* ${phone || "—"}`,
      `*Empresa:* ${company || "—"}`,
      `*Mensaje:* ${message}`,
    ].join("\n");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: Number(chatId), text, parse_mode: "Markdown" }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram error:", err);
      return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
