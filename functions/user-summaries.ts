'use server'
import { InvoicesByUserAndMonth } from './order-os-by-user-and-month'

export interface UserSummaries {
  name: string
  value: number
}

export const calculateUserSummaries = async (
  invoicesByUserAndMonth: InvoicesByUserAndMonth,
): Promise<UserSummaries[]> => {
  const userSummaries: UserSummaries[] = []

  Object.entries(invoicesByUserAndMonth).forEach(([userName, userData]) => {
    const totalNetValueSum = Object.values(userData).reduce(
      (acc, monthData) => acc + (monthData.totalNetValue || 0),
      0,
    )

    userSummaries.push({ name: userName, value: totalNetValueSum })
  })

  return userSummaries
}
