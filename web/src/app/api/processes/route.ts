import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  const { name, description, steps } = await request.json();
  const userId = parseInt((session.user as any).id);

  const process = await prisma.process.create({
    data: {
      name,
      description,
      steps: steps || 1,
      createdById: userId,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId,
      action: "creó el proceso",
      details: `Proceso "${name}" creado con ${steps || 1} paso(s)`,
    },
  });

  return NextResponse.json(process, { status: 201 });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "");

  await prisma.approval.deleteMany({ where: { request: { processId: id } } });
  await prisma.request.deleteMany({ where: { processId: id } });
  await prisma.process.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
