import type { NextFunction, Request, Response } from 'express'

function scrubSensitiveValues(input: unknown): unknown {
  if (!input || typeof input !== 'object') {
    return input
  }
  if (Array.isArray(input)) {
    return input.map((value) => scrubSensitiveValues(value))
  }
  return Object.entries(input).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (/password/i.test(key)) {
      acc[key] = '[redacted]'
    } else if (value && typeof value === 'object') {
      acc[key] = scrubSensitiveValues(value)
    } else {
      acc[key] = value
    }
    return acc
  }, {})
}

export function logRequests(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint()
  const { method, originalUrl } = req

  res.on('finish', () => {
    const elapsed = Number(process.hrtime.bigint() - start) / 1_000_000
    const payload: Record<string, unknown> = {
      status: res.statusCode,
      durationMs: Number(elapsed.toFixed(2))
    }

    if (Object.keys(req.query).length > 0) {
      payload.query = { ...req.query }
    }

    if (req.body && Object.keys(req.body).length > 0) {
      payload.body = scrubSensitiveValues(req.body)
    }

    if ((req as Request & { user?: unknown }).user) {
      payload.user = (req as Request & { user?: unknown }).user
    }

    console.info(`[API] ${method} ${originalUrl}`, payload)
  })

  next()
}
