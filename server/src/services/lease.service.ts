// services/lease.service.ts
import { prisma } from '../lib/prisma'

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
