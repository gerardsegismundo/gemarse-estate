import { Request, Response } from 'express'
import * as managerService from '../services/manager.service'

export const getManager = async (req: Request, res: Response) => {
  try {
    const cognitoId = req.user?.id
    if (!cognitoId) return res.status(401).json({ message: 'Unauthorized' })

    const manager = await managerService.fetchManager(cognitoId)
    if (!manager) return res.status(404).json({ message: 'Manager not found' })

    res.json(manager)
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving manager: ${err.message}` })
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
  } catch (err: any) {
    if (err.code === 'P2002')
      return res.status(409).json({ message: 'Manager already exists' })
    res.status(500).json({ message: `Error creating manager: ${err.message}` })
  }
}

export const updateManager = async (
  req: Request<{}, {}, managerService.ManagerUpdateData>,
  res: Response
) => {
  try {
    const cognitoId = req.user?.id
    if (!cognitoId) return res.status(401).json({ message: 'Unauthorized' })

    const existing = await managerService.fetchManager(cognitoId)
    if (!existing) return res.status(404).json({ message: 'Manager not found' })

    const updated = await managerService.updateManager(cognitoId, req.body)
    res.json(updated)
  } catch (err: any) {
    res.status(500).json({ message: `Error updating manager: ${err.message}` })
  }
}

export const getManagerProperties = async (req: Request, res: Response) => {
  try {
    const cognitoId = req.user?.id
    if (!cognitoId) return res.status(401).json({ message: 'Unauthorized' })

    const properties = await managerService.fetchManagerProperties(cognitoId)
    res.json(properties)
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving properties: ${err.message}` })
  }
}
