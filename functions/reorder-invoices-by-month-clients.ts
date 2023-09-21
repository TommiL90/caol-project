/* eslint-disable camelcase */
'use server'

import { RetrieveInvoice } from './retrieve-invoices'

export interface ClientWithNetRevenue {
  co_cliente: number
  receita_liquida_do_mes: number
}

export interface MonthWithClients {
  mes: number
  ano: number
  clientes: ClientWithNetRevenue[]
}

export const reorderInvoicesfromMonthsAndClients = async (
  data: RetrieveInvoice[],
): Promise<MonthWithClients[]> => {
  const result: MonthWithClients[] = data.reduce(
    (acc: MonthWithClients[], invoice: RetrieveInvoice) => {
      const invoiceMonth = invoice.data_emissao.getMonth()
      const invoiceYear = invoice.data_emissao.getFullYear()

      const existingMonth = acc.find(
        (item) => item.mes === invoiceMonth && item.ano === invoiceYear,
      )

      const receita_liquida =
        invoice.valor - invoice.total_imp_inc * (invoice.valor / 100)

      if (existingMonth) {
        const clienteExistente = existingMonth.clientes.find(
          (cliente) => cliente.co_cliente === invoice.co_cliente,
        )

        if (clienteExistente) {
          clienteExistente.receita_liquida_do_mes += receita_liquida
        } else {
          existingMonth.clientes.push({
            co_cliente: invoice.co_cliente,
            receita_liquida_do_mes: receita_liquida,
          })
        }
      } else {
        acc.push({
          mes: invoiceMonth,
          ano: invoiceYear,
          clientes: [
            {
              co_cliente: invoice.co_cliente,
              receita_liquida_do_mes: receita_liquida,
            },
          ],
        })
      }

      return acc
    },
    [],
  )

  return result
}
