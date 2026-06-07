import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Session } from "next-auth";

vi.mock("@/lib/rate-limit", () => ({
  ipLimiter: { check: () => ({ ok: true, remaining: 29, resetIn: 60000 }) },
  checkRateLimit: () => ({ ok: true, remaining: 29, resetIn: 60000 }),
  getIpKey: () => "127.0.0.1",
}));

const mockGetServerSession = vi.hoisted(() => vi.fn());
vi.mock("next-auth", () => ({
  getServerSession: mockGetServerSession,
}));

const mockPrisma = vi.hoisted(() => ({
  process: { findMany: vi.fn(), findUnique: vi.fn(), count: vi.fn() },
  request: { findMany: vi.fn(), count: vi.fn(), create: vi.fn() },
  approval: { count: vi.fn(), create: vi.fn() },
  user: { findMany: vi.fn() },
  activityLog: { findMany: vi.fn(), create: vi.fn() },
}));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

beforeEach(() => { vi.clearAllMocks(); });

describe("GET /api/requests (normal)", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/requests");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 200 with requests including relations", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.request.findMany.mockResolvedValueOnce([
      {
        id: 1,
        title: "Test Request",
        status: "pending",
        process: { name: "Test Process" },
        requester: { name: "Admin" },
        approvals: [{ id: 1, step: 1, status: "pending", user: { name: "Admin" } }],
      },
    ]);

    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/requests");
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].process.name).toBe("Test Process");
  });
});

describe("GET /api/requests?stats=true", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/requests?stats=true");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 200 with stats", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.process.count.mockResolvedValueOnce(10);
    mockPrisma.request.count.mockResolvedValueOnce(50);
    mockPrisma.approval.count.mockResolvedValueOnce(3);
    mockPrisma.approval.count.mockResolvedValueOnce(12);
    mockPrisma.request.count.mockResolvedValueOnce(20);
    mockPrisma.request.count.mockResolvedValueOnce(25);
    mockPrisma.request.count.mockResolvedValueOnce(5);
    mockPrisma.request.findMany.mockResolvedValueOnce([]);
    mockPrisma.activityLog.findMany.mockResolvedValueOnce([]);

    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/requests?stats=true");
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.totalProcesses).toBe(10);
    expect(data.totalRequests).toBe(50);
    expect(data.pendingTasks).toBe(3);
    expect(data.completedToday).toBe(12);
    expect(data.requestsByStatus).toHaveLength(3);
    expect(data.requestsByMonth).toHaveLength(12);
    expect(data.recentActivity).toEqual([]);
  });
});

describe("GET /api/requests?history=true", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/requests?history=true");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns 200 with activity logs (take 50)", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.activityLog.findMany.mockResolvedValueOnce([
      { id: 1, action: "creó una solicitud", details: "Test", createdAt: new Date(), user: { name: "Admin" } },
    ]);

    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/requests?history=true");
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(mockPrisma.activityLog.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 50 })
    );
  });
});

describe("POST /api/requests", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ processId: 1, title: "Test" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid schema", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ processId: 1, title: "" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 404 when process is not found", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.process.findUnique.mockResolvedValueOnce(null);

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ processId: 999, title: "Test Request" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("Proceso no encontrado");
  });

  it("returns 201 with request + approval for admin + activityLog", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.process.findUnique.mockResolvedValueOnce({
      id: 1,
      name: "Test Process",
      steps: 1,
    });
    mockPrisma.request.create.mockResolvedValueOnce({
      id: 1,
      processId: 1,
      requesterId: 1,
      title: "Test Request",
      currentStep: 1,
    });
    mockPrisma.user.findMany.mockResolvedValueOnce([
      { id: 2, email: "other@test.com", name: "Other", role: "admin" },
    ]);

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ processId: 1, title: "Test Request", description: "Testing" }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(201);
    expect(data.title).toBe("Test Request");
    expect(mockPrisma.approval.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ step: 1 }),
      })
    );
    expect(mockPrisma.activityLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: "creó una solicitud",
        }),
      })
    );
  });
});
