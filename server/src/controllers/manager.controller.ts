import { Request, Response } from 'express'
import * as managerService from '../services/manager.service'
import { handleError, handleNotFound, handleUnauthorized, handleConflict } from '../utils/error'

export const getManager = async (req: Request, res: Response) => {
  try {
    const cognitoId = req.user?.id
    if (!cognitoId) return handleUnauthorized(res, 'Unauthorized')

    const manager = await managerService.fetchManager(cognitoId)
    if (!manager) return handleNotFound(res, 'Manager not found')

    res.json(manager)
  } catch (error) {
    handleError(res, error, 'Error retrieving manager: ')
  }
}

export const createManager = async (
  req: Request<{}, {}, managerService.ManagerCreateData>,
  res: Response
) => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body
    if (!cognitoId || !name || !email)
      return res.status(400).json({ message: 'Missing required fields' })

    const manager = await managerService.createManager({
      cognitoId,
      name,
      email,
      phoneNumber,
    })
    res.status(201).json(manager)
  } catch (error: any) {
    if (error.code === 'P2002') return handleConflict(res, 'Manager already exists')
    handleError(res, error, 'Error creating manager: ')
  }
}

export const updateManager = async (
  req: Request<{}, {}, managerService.ManagerUpdateData>,
  res: Response
) => {
  try {
    const cognitoId = req.user?.id
    if (!cognitoId) return handleUnauthorized(res, 'Unauthorized')

    const existing = await managerService.fetchManager(cognitoId)
    if (!existing) return handleNotFound(res, 'Manager not found')

    const updated = await managerService.updateManager(cognitoId, req.body)
    res.json(updated)
  } catch (error) {
    handleError(res, error, 'Error updating manager: ')
  }
}

export const getManagerProperties = async (req: Request, res: Response) => {
  try {
    const cognitoId = req.user?.id
    if (!cognitoId) return handleUnauthorized(res, 'Unauthorized')

    const properties = await managerService.fetchManagerProperties(cognitoId)
    res.json(properties)
  } catch (error) {
    handleError(res, error, 'Error retrieving properties: ')
  }
}
