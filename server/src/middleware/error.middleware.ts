import { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
  }
}

export const asyncHandler = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

const isPrismaError = (error: unknown): error is { code: string } => {
  return typeof error === 'object' && error !== null && 'code' in error
}

export const toAppError = (error: unknown): AppError => {
  if (error instanceof AppError) return error

  if (isPrismaError(error)) {
    switch (error.code) {
      case 'P2002':
        return new AppError(409, 'Conflict')
      case 'P2025':
        return new AppError(404, 'Resource not found')
      default:
        break
    }
  }

  if (error instanceof Error) {
    return new AppError(500, error.message)
  }

  return new AppError(500, 'Unknown error')
}

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const appError = toAppError(error)
  res.status(appError.statusCode).json({ message: appError.message })
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })
}
