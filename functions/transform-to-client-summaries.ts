/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { OutputItem } from './transform-invoices-to-monthly-format'
import { UserSummaries } from './user-summaries'

export const transformToClientSummaries = async (
  data: OutputItem[],
): Promise<UserSummaries[]> => {
  const clientSumMap: Record<string, number> = {}

  data.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'date') {
        const cliente = key

        const numericValue =
          typeof value === 'number' ? value : parseFloat(value)

        if (!isNaN(numericValue)) {
          clientSumMap[cliente] = (clientSumMap[cliente] || 0) + numericValue
        }
      }
    })
  })

  const clientSummaries: UserSummaries[] = Object.entries(clientSumMap)
    .filter(([_, value]) => value !== 0)
    .map(([cliente, value]) => ({
      name: cliente,
      value: parseFloat(value.toFixed(2)),
    }))

  return clientSummaries
}
