import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = parseInt((session.user as any).id);

  const approvals = await prisma.approval.findMany({
    where: { userId },
    include: {
      request: {
        include: {
          process: { select: { name: true, steps: true } },
          requester: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(approvals);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { approvalId, status, comment } = await request.json();
  const userId = parseInt((session.user as any).id);

  const approval = await prisma.approval.findUnique({
    where: { id: approvalId },
    include: { request: { include: { process: true } } },
  });

  if (!approval) return NextResponse.json({ error: "Aprobación no encontrada" }, { status: 404 });

  await prisma.approval.update({
    where: { id: approvalId },
    data: { status, comment },
  });

  if (status === "rejected") {
    await prisma.request.update({
      where: { id: approval.requestId },
      data: { status: "rejected" },
    });

    await prisma.activityLog.create({
      data: {
        userId,
        action: "rechazó la solicitud",
        details: `"${approval.request.title}" — ${comment || "Sin comentario"}`,
      },
    });

    return NextResponse.json({ success: true });
  }

  const nextStep = approval.step + 1;
  if (nextStep > approval.request.process.steps) {
    await prisma.request.update({
      where: { id: approval.requestId },
      data: { status: "approved" },
    });

    await prisma.activityLog.create({
      data: {
        userId,
        action: "aprobó la solicitud",
        details: `"${approval.request.title}" — Aprobación final completada`,
      },
    });
  } else {
    await prisma.request.update({
      where: { id: approval.requestId },
      data: { currentStep: nextStep },
    });

    const nextApprovers = await prisma.user.findMany({
      where: {
        role: "admin",
        id: { not: approval.request.requesterId },
      },
    });

    if (nextApprovers.length > 0) {
      const nextApprover = nextApprovers.find(
        (u) => u.id !== userId
      ) || nextApprovers[0];

      await prisma.approval.create({
        data: {
          requestId: approval.requestId,
          userId: nextApprover.id,
          step: nextStep,
        },
      });
    }

    await prisma.activityLog.create({
      data: {
        userId,
        action: "aprobó la solicitud",
        details: `"${approval.request.title}" — Paso ${approval.step}/${approval.request.process.steps}`,
      },
    });
  }

  return NextResponse.json({ success: true });
}
