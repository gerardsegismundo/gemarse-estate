import { Request, Response } from 'express'
import { fetchLeases, fetchLeasePayments } from '../services/lease.service'
import { handleError, handleBadRequest } from '../utils/error'

export const getLeases = async (req: Request, res: Response) => {
  try {
    const leases = await fetchLeases()
    res.json(leases)
  } catch (error) {
    handleError(res, error)
  }
}

export const getLeasePayments = async (req: Request, res: Response) => {
  try {
    const leaseId = Number(req.params.id)
    if (isNaN(leaseId)) {
      return handleBadRequest(res, 'Invalid lease ID')
    }

    const payments = await fetchLeasePayments(leaseId)
    res.json(payments)
  } catch (error) {
    handleError(res, error)
  }
}
