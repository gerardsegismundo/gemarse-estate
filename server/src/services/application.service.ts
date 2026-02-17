// services/application.service.ts
import { prisma } from '../lib/prisma'
import { calculateNextPaymentDate } from '../helpers/application.helper'
import { ApplicationStatus } from '@prisma/client'

export const listApplications = async (userId?: string, userType?: string) => {
  let whereClause: any = {}

  if (userId && userType) {
    if (userType === 'tenant') {
      whereClause = { tenantCognitoId: userId }
    } else if (userType === 'manager') {
      whereClause = { property: { managerCognitoId: userId } }
    }
  }

  const applications = await prisma.application.findMany({
    where: whereClause,
    include: {
      property: { include: { location: true, manager: true } },
      tenant: true,
      lease: true,
    },
  })

  // Format applications with next payment date
  return applications.map((app) => ({
    ...app,
    lease: app.lease
      ? {
          ...app.lease,
          nextPaymentDate: calculateNextPaymentDate(app.lease.startDate),
        }
      : null,
  }))
}

export const createApplication = async (data: {
  applicationDate: string
  status: ApplicationStatus
  propertyId: number
  tenantCognitoId: string
  name: string
  email: string
  phoneNumber?: string
  message?: string
}) => {
  const {
    applicationDate,
    status,
    propertyId,
    tenantCognitoId,
    name,
    email,
    phoneNumber,
    message,
  } = data

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    select: { pricePerMonth: true, securityDeposit: true },
  })

  if (!property) throw new Error('Property not found')

  return await prisma.$transaction(async (prisma) => {
    const startDate = new Date()
    const endDate = new Date(startDate)
    endDate.setFullYear(endDate.getFullYear() + 1)

    const lease = await prisma.lease.create({
      data: {
        startDate,
        endDate,
        rent: property.pricePerMonth,
        deposit: property.securityDeposit,
        property: { connect: { id: propertyId } },
        tenant: { connect: { cognitoId: tenantCognitoId } },
      },
    })

    return await prisma.application.create({
      data: {
        applicationDate: new Date(applicationDate),
        status,
        name,
        email,
        phoneNumber: phoneNumber || '',
        message,
        property: { connect: { id: propertyId } },
        tenant: { connect: { cognitoId: tenantCognitoId } },
        lease: { connect: { id: lease.id } },
      },
      include: {
        property: true,
        tenant: true,
        lease: true,
      },
    })
  })
}

export const updateApplicationStatus = async (
  id: number,
  status: ApplicationStatus
) => {
  const application = await prisma.application.findUnique({
    where: { id },
    include: { property: true, tenant: true, lease: true },
  })
  if (!application) throw new Error('Application not found')

  if (status === ApplicationStatus.Approved) {
    const newLease = await prisma.lease.create({
      data: {
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        rent: application.property.pricePerMonth,
        deposit: application.property.securityDeposit,
        propertyId: application.propertyId,
        tenantCognitoId: application.tenantCognitoId,
      },
    })

    await prisma.property.update({
      where: { id: application.propertyId },
      data: {
        tenants: { connect: { cognitoId: application.tenantCognitoId } },
      },
    })

    await prisma.application.update({
      where: { id },
      data: { status, leaseId: newLease.id },
    })
  } else {
    await prisma.application.update({
      where: { id },
      data: { status },
    })
  }

  return prisma.application.findUnique({
    where: { id },
    include: { property: true, tenant: true, lease: true },
  })
}
