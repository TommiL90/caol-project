'use server'
import { getMonthName } from './get-month-name'
import { InvoicesByUserAndMonth } from './order-os-by-user-and-month'

export interface MonthObject {
  month: string
  averageFixedCost: number
}

export type MonthObjectArray = MonthObject & Record<string, number | undefined>

export const transformMonthObjectToArray = async (
  invoicesByUserAndMonth: InvoicesByUserAndMonth,
): Promise<MonthObjectArray[]> => {
  const newArr: MonthObjectArray[] = []
  const avgFixedCost = 5000

  const months = Array.from(
    new Set(
      Object.values(invoicesByUserAndMonth).flatMap((user) =>
        Object.keys(user),
      ),
    ),
  )

  months.forEach((month) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newObj: any = {
      month: getMonthName(month),
      averageFixedCost: avgFixedCost,
    }

    Object.entries(invoicesByUserAndMonth).forEach(([user, userData]) => {
      if (userData[month] && userData[month].invoices) {
        newObj[user] = userData[month].invoices.reduce(
          (acc, invoice) => acc + invoice.receita_liquida,
          0,
        )
      } else {
        newObj[user] = 0
      }
    })

    newArr.push(newObj)
  })

  return newArr
}
