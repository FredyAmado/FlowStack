import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await hash("admin123", 10);
  const userPassword = await hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@automate.ai" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@flowstack.ai",
      password: adminPassword,
      role: "admin",
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "demo@flowstack.ai" },
    update: {},
    create: {
      name: "Usuario Demo",
      email: "demo@flowstack.ai",
      password: userPassword,
      role: "user",
    },
  });

  const process1 = await prisma.process.create({
    data: {
      name: "Aprobación de Facturas",
      description: "Flujo de aprobación de facturas en 2 pasos: revisión contable y aprobación final",
      steps: 2,
      createdById: admin.id,
    },
  });

  const process2 = await prisma.process.create({
    data: {
      name: "Solicitud de Vacaciones",
      description: "Solicitud y aprobación de vacaciones del personal",
      steps: 1,
      createdById: admin.id,
    },
  });

  const process3 = await prisma.process.create({
    data: {
      name: "Compra de Insumos",
      description: "Autorización de compras de insumos y materiales",
      steps: 3,
      createdById: admin.id,
    },
  });

  const process4 = await prisma.process.create({
    data: {
      name: "Reembolso de Gastos",
      description: "Solicitud y aprobación de reembolsos de gastos de viaje en 3 pasos: registro, revisión gerencial, aprobación final",
      steps: 3,
      createdById: admin.id,
    },
  });

  const request1 = await prisma.request.create({
    data: {
      processId: process1.id,
      requesterId: user.id,
      title: "Factura Proveedor XYZ - $15,000",
      description: "Factura por servicios de consultoría del mes de mayo. Adjunto comprobante digital.",
    },
  });

  await prisma.approval.create({
    data: {
      requestId: request1.id,
      userId: admin.id,
      step: 1,
    },
  });

  const request2 = await prisma.request.create({
    data: {
      processId: process2.id,
      requesterId: user.id,
      title: "Vacaciones - Juan Pérez (Julio 2026)",
      description: "Solicito 15 días hábiles de vacaciones del 1 al 21 de julio.",
    },
  });

  await prisma.approval.create({
    data: {
      requestId: request2.id,
      userId: admin.id,
      step: 1,
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: "creó la solicitud",
      details: '"Factura Proveedor XYZ - $15,000" para proceso "Aprobación de Facturas"',
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: "creó la solicitud",
      details: '"Vacaciones - Juan Pérez (Julio 2026)" para proceso "Solicitud de Vacaciones"',
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: "creó 4 procesos de automatización",
      details: "Aprobación de Facturas, Solicitud de Vacaciones, Compra de Insumos, Reembolso de Gastos",
    },
  });

  console.log("Seed completado exitosamente");
  console.log("  Admin: admin@flowstack.ai / admin123");
  console.log("  Demo:  demo@flowstack.ai / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
