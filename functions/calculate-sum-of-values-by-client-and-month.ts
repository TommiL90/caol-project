'use server'
/* eslint-disable camelcase */
import { RetrieveInvoice } from './retrieve-invoices'

export const calculateSumOfValuesByClientAndMonth = async (
  data: RetrieveInvoice[],
): Promise<Record<string, number>> => {
  const soma: Record<string, number> = {}

  data.forEach((invoice) => {
    const { co_cliente, data_emissao, valor, total_imp_inc } = invoice
    const month = data_emissao.getMonth() + 1 // El mes es 0-indexed, sumamos 1
    const year = data_emissao.getFullYear()
    const key = `${co_cliente}-${year}-${month}`

    if (!soma[key]) {
      soma[key] = 0
    }

    soma[key] += valor - total_imp_inc
  })
  return soma
}
