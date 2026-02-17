import { Request, Response } from 'express'
import * as tenantService from '../services/tenant.service'

const handleNotFound = (res: Response, message: string) =>
  res.status(404).json({ message })
const handleError = (res: Response, error: any, prefix = '') =>
  res.status(500).json({
    message: `${prefix}${error instanceof Error ? error.message : 'Unknown error'}`,
  })

export const getTenant = async (
  req: Request<{ cognitoId: string }>,
  res: Response
) => {
  try {
    const tenant = await tenantService.getTenantByCognitoId(
      req.params.cognitoId
    )
    if (!tenant) return handleNotFound(res, 'Tenant not found')
    res.json(tenant)
  } catch (error) {
    handleError(res, error, 'Error retrieving tenant: ')
  }
}

export const createTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await tenantService.createTenant(req.body)
    res.status(201).json(tenant)
  } catch (error) {
    handleError(res, error, 'Error creating tenant: ')
  }
}

export const updateTenant = async (
  req: Request<{ cognitoId: string }>,
  res: Response
) => {
  try {
    const updated = await tenantService.updateTenant(
      req.params.cognitoId,
      req.body
    )
    res.json(updated)
  } catch (error: any) {
    if (error.code === 'P2025') return handleNotFound(res, 'Tenant not found')
    handleError(res, error)
  }
}

export const getCurrentResidences = async (
  req: Request<{ cognitoId: string }>,
  res: Response
) => {
  try {
    const residences = await tenantService.getCurrentResidencesForTenant(
      req.params.cognitoId
    )
    res.json(residences)
  } catch (error) {
    handleError(res, error, 'Error retrieving residences: ')
  }
}

export const addFavoriteProperty = async (
  req: Request<{ cognitoId: string; propertyId: string }>,
  res: Response
) => {
  try {
    const result = await tenantService.addFavoriteProperty(
      req.params.cognitoId,
      Number(req.params.propertyId)
    )
    if (!result) return handleNotFound(res, 'Tenant not found')
    if (result === 'exists')
      return res
        .status(409)
        .json({ message: 'Property already added as favorite' })
    res.json(result)
  } catch (error) {
    handleError(res, error, 'Error adding favorite property: ')
  }
}

export const removeFavoriteProperty = async (
  req: Request<{ cognitoId: string; propertyId: string }>,
  res: Response
) => {
  try {
    const updated = await tenantService.removeFavoriteProperty(
      req.params.cognitoId,
      Number(req.params.propertyId)
    )
    res.json(updated)
  } catch (error) {
    handleError(res, error, 'Error removing favorite property: ')
  }
}
