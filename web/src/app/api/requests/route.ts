import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { searchParams } = new URL(request.url);

  if (searchParams.get("stats") === "true") {
    const userId = parseInt((session.user as any).id);

    const totalProcesses = await prisma.process.count();
    const totalRequests = await prisma.request.count();
    const pendingTasks = await prisma.approval.count({
      where: { userId, status: "pending" },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const completedToday = await prisma.approval.count({
      where: {
        userId,
        status: { not: "pending" },
        updatedAt: { gte: today },
      },
    });

    const pending = await prisma.request.count({ where: { status: "pending" } });
    const approved = await prisma.request.count({ where: { status: "approved" } });
    const rejected = await prisma.request.count({ where: { status: "rejected" } });

    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const requestsByMonth = months.map((name, i) => ({
      name,
      pendientes: 0,
      aprobados: 0,
      rechazados: 0,
    }));

    const allRequests = await prisma.request.findMany({
      select: { status: true, createdAt: true },
    });

    allRequests.forEach((r) => {
      const month = new Date(r.createdAt).getMonth();
      if (r.status === "pending") requestsByMonth[month].pendientes++;
      else if (r.status === "approved") requestsByMonth[month].aprobados++;
      else if (r.status === "rejected") requestsByMonth[month].rechazados++;
    });

    const logs = await prisma.activityLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      totalProcesses,
      totalRequests,
      pendingTasks,
      completedToday,
      requestsByStatus: [
        { name: "Pendientes", value: pending },
        { name: "Aprobados", value: approved },
        { name: "Rechazados", value: rejected },
      ],
      requestsByMonth,
      recentActivity: logs.map((l) => ({
        id: l.id,
        action: l.action,
        details: l.details || "",
        user: l.user.name,
        time: new Date(l.createdAt).toLocaleDateString("es-ES"),
      })),
    });
  }

  if (searchParams.get("history") === "true") {
    const logs = await prisma.activityLog.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(logs);
  }

  const requests = await prisma.request.findMany({
    include: {
      process: { select: { name: true } },
      requester: { select: { name: true } },
      approvals: {
        include: { user: { select: { name: true } } },
        orderBy: { step: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { processId, title, description } = await request.json();
  const userId = parseInt((session.user as any).id);

  const process = await prisma.process.findUnique({ where: { id: processId } });
  if (!process) return NextResponse.json({ error: "Proceso no encontrado" }, { status: 404 });

  const request_ = await prisma.request.create({
    data: {
      processId,
      requesterId: userId,
      title,
      description,
      currentStep: 1,
    },
  });

  const approvers = await prisma.user.findMany({
    where: { role: "admin", id: { not: userId } },
  });

  if (approvers.length > 0) {
    await prisma.approval.create({
      data: {
        requestId: request_.id,
        userId: approvers[0].id,
        step: 1,
      },
    });
  }

  await prisma.activityLog.create({
    data: {
      userId,
      action: "creó una solicitud",
      details: `Solicitud "${title}" para proceso "${process.name}"`,
    },
  });

  return NextResponse.json(request_, { status: 201 });
}
