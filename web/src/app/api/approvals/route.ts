import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ipLimiter, checkRateLimit } from "@/lib/rate-limit";

const patchApprovalSchema = z.object({
  approvalId: z.coerce.number().int().positive(),
  status: z.enum(["approved", "rejected"]),
  comment: z.string().max(2000).optional().nullable(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = parseInt(session.user.id);

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

  const rateCheck = checkRateLimit(request, ipLimiter);
  if (!rateCheck.ok) {
    return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
  }

  const body = await request.json();
  const parsed = patchApprovalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { approvalId, status, comment } = parsed.data;
  const userId = parseInt(session.user.id);

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
