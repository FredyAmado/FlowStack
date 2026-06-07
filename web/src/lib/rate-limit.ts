const store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(opts: { interval: number; max: number }) {
  return {
    check: (key: string): { ok: boolean; remaining: number; resetIn: number } => {
      const now = Date.now()
      const entry = store.get(key)

      if (!entry || now > entry.resetAt) {
        store.set(key, { count: 1, resetAt: now + opts.interval })
        return { ok: true, remaining: opts.max - 1, resetIn: opts.interval }
      }

      entry.count++

      if (entry.count > opts.max) {
        return { ok: false, remaining: 0, resetIn: entry.resetAt - now }
      }

      return { ok: true, remaining: opts.max - entry.count, resetIn: entry.resetAt - now }
    },
  }
}

const ipLimiter = rateLimit({ interval: 60_000, max: 30 })
const authLimiter = rateLimit({ interval: 60_000, max: 5 })
const chatLimiter = rateLimit({ interval: 60_000, max: 10 })
const contactLimiter = rateLimit({ interval: 60_000, max: 5 })

export function getIpKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "127.0.0.1"
}

export function checkRateLimit(request: Request, limiter: typeof ipLimiter) {
  const ip = getIpKey(request)
  return limiter.check(ip)
}

export { ipLimiter, authLimiter, chatLimiter, contactLimiter }
