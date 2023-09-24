'use server'
import { UserData } from '@/types/userData'
import { RetrieveInvoice } from './retrieve-invoices'
import { OS } from './retrieve-os-by-user'

export const orderInvoicesByUserAndMonth = async (
  osByUsers: OS[],
  invoices: RetrieveInvoice[],
) => {
  const invoicesByUserAndMonth = osByUsers.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (accumulator: { [key: string]: any }, os) => {
      const user = os.co_usuario

      if (user !== null && user !== undefined) {
        if (!accumulator[user]) {
          accumulator[user] = {}
        }

        for (const invoice of invoices) {
          if (invoice.co_os === os.co_os) {
            const invoiceDate = new Date(invoice.data_emissao)
            const monthKey = `${invoiceDate.getFullYear()}-${
              invoiceDate.getMonth() + 1
            }`

            if (!accumulator[user][monthKey]) {
              accumulator[user][monthKey] = {
                invoices: [],
                totalNetValue: 0,
                totalCommission: 0,
              }
            }

            const value = invoice.valor
            const totalImpInc = (invoice.total_imp_inc / 100) * value

            const netValue = value - totalImpInc

            const porcentualCommission = invoice.comissao_cn / 100

            const commission = porcentualCommission * netValue

            const formattedInvoice = {
              ...invoice,
              receita_liquida: netValue,
              comissao: commission,
            }

            accumulator[user][monthKey].invoices.push(formattedInvoice)
            accumulator[user][monthKey].totalNetValue += netValue
            accumulator[user][monthKey].totalCommission += commission
          }
        }
      }

      return accumulator
    },
    {},
  )

  return invoicesByUserAndMonth
}

export interface InvoicesByUserAndMonth {
  [user: string]: {
    [month: string]: UserData
  }
}
