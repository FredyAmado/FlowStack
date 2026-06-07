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
  approval: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
  request: { findUnique: vi.fn(), update: vi.fn() },
  user: { findMany: vi.fn() },
  activityLog: { create: vi.fn() },
}));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

beforeEach(() => { vi.clearAllMocks(); });

describe("GET /api/approvals", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { GET } = await import("./route");
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns approvals for authenticated user", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.approval.findMany.mockResolvedValueOnce([{ id: 1, status: "pending" }]);

    const { GET } = await import("./route");
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
  });
});

describe("PATCH /api/approvals", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { PATCH } = await import("./route");
    const req = new Request("http://localhost/api/approvals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approvalId: 1, status: "approved" }),
    });
    const res = await PATCH(req);
    expect(res.status).toBe(401);
  });

  it("approves and completes multi-step process", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.approval.findUnique.mockResolvedValueOnce({
      id: 1, step: 2, status: "pending", requestId: 1,
      request: { id: 1, title: "Test", status: "pending", process: { steps: 2 }, requesterId: 2 },
    });

    const { PATCH } = await import("./route");
    const req = new Request("http://localhost/api/approvals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approvalId: 1, status: "approved" }),
    });
    const res = await PATCH(req);
    expect(res.status).toBe(200);
    expect(mockPrisma.request.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: "approved" } })
    );
  });

  it("rejects a request", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.approval.findUnique.mockResolvedValueOnce({
      id: 1, step: 1, status: "pending", requestId: 1,
      request: { id: 1, title: "Test", status: "pending", process: { steps: 1 }, requesterId: 2 },
    });

    const { PATCH } = await import("./route");
    const req = new Request("http://localhost/api/approvals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approvalId: 1, status: "rejected", comment: "Not needed" }),
    });
    const res = await PATCH(req);
    expect(res.status).toBe(200);
  });
});
