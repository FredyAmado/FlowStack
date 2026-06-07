import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Session } from "next-auth";

const mockGetServerSession = vi.hoisted(() => vi.fn());
vi.mock("next-auth", () => ({
  getServerSession: mockGetServerSession,
}));

vi.mock("@/lib/rate-limit", () => ({
  contactLimiter: { check: () => ({ ok: true, remaining: 4, resetIn: 60000 }) },
  checkRateLimit: () => ({ ok: true, remaining: 4, resetIn: 60000 }),
  getIpKey: () => "127.0.0.1",
}));

const mockPrisma = vi.hoisted(() => ({
  contactSubmission: { create: vi.fn(), findMany: vi.fn() },
}));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

beforeEach(() => { vi.clearAllMocks(); });

describe("POST /api/contact", () => {
  it("creates contact and returns ok", async () => {
    mockPrisma.contactSubmission.create.mockResolvedValue({ id: 1 });

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "test@test.com", message: "Hello" }),
    });

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(mockPrisma.contactSubmission.create).toHaveBeenCalledTimes(1);
  });

  it("returns 400 for missing name", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@test.com", message: "Hello" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "not-an-email", message: "Hello" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

describe("GET /api/contact", () => {
  it("returns 401 without auth", async () => {
    mockGetServerSession.mockResolvedValueOnce(null);
    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/contact");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("returns contacts for admin", async () => {
    mockGetServerSession.mockResolvedValueOnce({
      user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
    } as Session);
    mockPrisma.contactSubmission.findMany.mockResolvedValueOnce([{ id: 1, name: "Test" }]);

    const { GET } = await import("./route");
    const req = new Request("http://localhost/api/contact");
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toHaveLength(1);
  });
});
