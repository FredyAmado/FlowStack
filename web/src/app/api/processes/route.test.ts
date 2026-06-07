import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Session } from "next-auth";

const mockRateLimitOk = vi.hoisted(() => ({ current: true }));
vi.mock("@/lib/rate-limit", () => ({
  ipLimiter: { check: () => ({ ok: true, remaining: 29, resetIn: 60000 }) },
  checkRateLimit: () => {
    if (!mockRateLimitOk.current) {
      return { ok: false, remaining: 0, resetIn: 60000 };
    }
    return { ok: true, remaining: 29, resetIn: 60000 };
  },
  getIpKey: () => "127.0.0.1",
}));

const mockGetServerSession = vi.hoisted(() => vi.fn());
vi.mock("next-auth", () => ({
  getServerSession: mockGetServerSession,
}));

const mockPrisma = vi.hoisted(() => ({
  process: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), delete: vi.fn() },
  approval: { deleteMany: vi.fn() },
  request: { deleteMany: vi.fn() },
  activityLog: { create: vi.fn() },
}));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

beforeEach(() => {
  vi.clearAllMocks();
  mockRateLimitOk.current = true;
});

describe("GET /api/processes", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { GET } = await import("./route");
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns 200 with process list including relations", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.process.findMany.mockResolvedValueOnce([
      {
        id: 1,
        name: "Test Process",
        steps: 3,
        createdBy: { name: "Admin" },
        _count: { requests: 2 },
      },
    ]);

    const { GET } = await import("./route");
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].createdBy.name).toBe("Admin");
    expect(data[0]._count.requests).toBe(2);
  });
});

describe("POST /api/processes", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/processes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", steps: 1 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 429 on rate limit", async () => {
    mockRateLimitOk.current = false;
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/processes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", steps: 1 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
  });

  it("returns 400 when name is empty", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/processes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", steps: 1 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Datos inválidos");
  });

  it("returns 400 when steps > 10", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/processes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", steps: 15 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 201 with created process and activityLog", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    mockPrisma.process.create.mockResolvedValueOnce({
      id: 1,
      name: "Test Process",
      description: null,
      steps: 3,
      createdById: 1,
    });

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/processes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test Process", description: null, steps: 3 }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(201);
    expect(data.name).toBe("Test Process");
    expect(mockPrisma.activityLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: 1,
          action: "creó el proceso",
        }),
      })
    );
  });
});

describe("DELETE /api/processes", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { DELETE } = await import("./route");
    const req = new Request("http://localhost/api/processes?id=1", { method: "DELETE" });
    const res = await DELETE(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid ID (string)", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { DELETE } = await import("./route");
    const req = new Request("http://localhost/api/processes?id=abc", { method: "DELETE" });
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for negative ID", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { DELETE } = await import("./route");
    const req = new Request("http://localhost/api/processes?id=-1", { method: "DELETE" });
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  it("returns 200 with cascade delete", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { DELETE } = await import("./route");
    const req = new Request("http://localhost/api/processes?id=1", { method: "DELETE" });
    const res = await DELETE(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockPrisma.approval.deleteMany).toHaveBeenCalled();
    expect(mockPrisma.request.deleteMany).toHaveBeenCalled();
    expect(mockPrisma.process.delete).toHaveBeenCalled();
  });
});
