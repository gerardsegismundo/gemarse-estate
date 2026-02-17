import { Request, Response } from 'express'
import { fetchLeases, fetchLeasePayments } from '../services/lease.service'

export const getLeases = async (req: Request, res: Response) => {
  try {
    const leases = await fetchLeases()
    res.json(leases)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const getLeasePayments = async (req: Request, res: Response) => {
  try {
    const leaseId = Number(req.params.id)
    if (isNaN(leaseId)) {
      return res.status(400).json({ message: 'Invalid lease ID' })
    }

    const payments = await fetchLeasePayments(leaseId)
    res.json(payments)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}
