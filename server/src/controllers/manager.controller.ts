import { NextFunction, Request, Response } from 'express'
import * as managerService from '../services/manager.service'
import { AppError, asyncHandler } from '../middleware/error.middleware'

export const getManager = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const cognitoId = req.user?.id
    if (!cognitoId) throw new AppError(401, 'Unauthorized')

    const manager = await managerService.fetchManager(cognitoId)
    if (!manager) throw new AppError(404, 'Manager not found')

    res.json(manager)
  }
)

export const createManager = asyncHandler(
  async (
    req: Request<{}, {}, managerService.ManagerCreateData>,
    res: Response,
    _next: NextFunction
  ) => {
    const { cognitoId, name, email, phoneNumber } = req.body

    if (!cognitoId || !name || !email) {
      throw new AppError(400, 'Missing required fields')
    }

    const manager = await managerService.createManager({
      cognitoId,
      name,
      email,
      phoneNumber,
    })

    res.status(201).json(manager)
  }
)

export const updateManager = asyncHandler(
  async (
    req: Request<{}, {}, managerService.ManagerUpdateData>,
    res: Response,
    _next: NextFunction
  ) => {
    const cognitoId = req.user?.id
    if (!cognitoId) throw new AppError(401, 'Unauthorized')

    const existing = await managerService.fetchManager(cognitoId)
    if (!existing) throw new AppError(404, 'Manager not found')

    const updated = await managerService.updateManager(cognitoId, req.body)
    res.json(updated)
  }
)

export const getManagerProperties = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const cognitoId = req.user?.id
    if (!cognitoId) throw new AppError(401, 'Unauthorized')

    const properties = await managerService.fetchManagerProperties(cognitoId)
    res.json(properties)
  }
)
