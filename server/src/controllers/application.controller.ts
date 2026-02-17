import { Request, Response } from 'express'
import * as applicationService from '../services/application.service'

export const listApplications = async (req: Request, res: Response) => {
  try {
    const { userId, userType } = req.query
    const apps = await applicationService.listApplications(
      userId as string,
      userType as string
    )
    res.json(apps)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const createApplication = async (req: Request, res: Response) => {
  try {
    const newApp = await applicationService.createApplication(req.body)
    res.status(201).json(newApp)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedApp = await applicationService.updateApplicationStatus(
      Number(id),
      status
    )

    res.json(updatedApp)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
