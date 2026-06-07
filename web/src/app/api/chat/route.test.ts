import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/rate-limit", () => ({
  chatLimiter: { check: () => ({ ok: true, remaining: 9, resetIn: 60000 }) },
  contactLimiter: { check: () => ({ ok: true, remaining: 4, resetIn: 60000 }) },
  ipLimiter: { check: () => ({ ok: true, remaining: 29, resetIn: 60000 }) },
  checkRateLimit: () => ({ ok: true, remaining: 9, resetIn: 60000 }),
  getIpKey: () => "127.0.0.1",
}));

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

vi.mock("@/lib/prisma", () => ({
  prisma: {
    contactSubmission: { create: vi.fn(), findMany: vi.fn() },
    user: { findUnique: vi.fn(), findMany: vi.fn() },
    process: { findUnique: vi.fn(), findMany: vi.fn(), create: vi.fn(), count: vi.fn(), delete: vi.fn() },
    request: { findMany: vi.fn(), create: vi.fn(), count: vi.fn(), update: vi.fn(), deleteMany: vi.fn() },
    approval: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), count: vi.fn(), deleteMany: vi.fn() },
    activityLog: { create: vi.fn(), findMany: vi.fn() },
    $connect: vi.fn(), $disconnect: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockFetch.mockReset();
});

describe("POST /api/chat", () => {
  it("returns reply for valid messages", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "Hola, ¿cómo puedo ayudarte?" } }],
      }),
    });

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hola" }] }),
    });

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.reply).toBe("Hola, ¿cómo puedo ayudarte?");
  });

  it("returns 400 for missing messages", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for empty messages array", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 for message with >2000 chars", async () => {
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "x".repeat(2001) }] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 500 when API key is missing", async () => {
    delete process.env.OPENROUTER_API_KEY;
    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hola" }] }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
