import { UserInvoices } from '@/types/userInvoices'

export const calculateNetValueAndCommissionOfMOnth = (
  userInvoices: UserInvoices,
) =>
  Object.entries(userInvoices).reduce(
    (accumulator, [, userData]) => {
      const netValueMonths = userData.totalNetValue
      const totalCommissionMonths = userData.totalCommission

      accumulator.netValueMonths += netValueMonths
      accumulator.totalCommissionMonths += totalCommissionMonths

      return accumulator
    },
    { netValueMonths: 0, totalCommissionMonths: 0 },
  )
