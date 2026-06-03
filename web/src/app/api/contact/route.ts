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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
