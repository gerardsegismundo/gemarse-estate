import { Response } from 'express'

export const handleNotFound = (
  res: Response,
  message: string
): Response => res.status(404).json({ message })

export const handleError = (
  res: Response,
  error: unknown,
  prefix = ''
): Response => {
  const message =
    prefix +
    (error instanceof Error ? error.message : 'Unknown error')
  return res.status(500).json({ message })
}

export const handleConflict = (
  res: Response,
  message: string
): Response => res.status(409).json({ message })

export const handleUnauthorized = (
  res: Response,
  message = 'Unauthorized'
): Response => res.status(401).json({ message })

export const handleBadRequest = (
  res: Response,
  message: string
): Response => res.status(400).json({ message })
