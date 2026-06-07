import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ipLimiter, checkRateLimit } from "@/lib/rate-limit";

const createProcessSchema = z.object({
  name: z.string().min(1, "Nombre requerido").max(200),
  description: z.string().max(2000).optional().nullable(),
  steps: z.coerce.number().int().min(1).max(10).default(1),
});

const deleteProcessSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const processes = await prisma.process.findMany({
    include: {
      createdBy: { select: { name: true } },
      _count: { select: { requests: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(processes);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const rateCheck = checkRateLimit(request, ipLimiter);
  if (!rateCheck.ok) {
    return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = createProcessSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, description, steps } = parsed.data;
  const userId = parseInt(session.user.id);

  const process = await prisma.process.create({
    data: { name, description, steps, createdById: userId },
  });

  await prisma.activityLog.create({
    data: {
      userId,
      action: "creó el proceso",
      details: `Proceso "${name}" creado con ${steps} paso(s)`,
    },
  });

  return NextResponse.json(process, { status: 201 });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const parsed = deleteProcessSchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const { id } = parsed.data;

  await prisma.approval.deleteMany({ where: { request: { processId: id } } });
  await prisma.request.deleteMany({ where: { processId: id } });
  await prisma.process.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
