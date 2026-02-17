// services/lease.service.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const fetchLeases = async () => {
  return prisma.lease.findMany({
    include: {
      tenant: true,
      property: true,
    },
  })
}

export const fetchLeasePayments = async (leaseId: number) => {
  return prisma.payment.findMany({
    where: { leaseId },
  })
}
