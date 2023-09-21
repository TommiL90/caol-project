/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
export const transformDataClientForRecharts = async (
  data: Record<string, number>,
): Promise<Array<Record<string, any>>> => {
  const result: Record<string, Record<string, number>> = {}

  for (const key in data) {
    const [user, year, month] = key.split('-')
    const date = `${year}-${month}`

    result[date] = result[date] || {}

    if (user) {
      result[date][user] = (result[date][user] || 0) + data[key]
    }
  }

  const transformedData = Object.entries(result).map(([month, values]) => ({
    month,
    ...values,
  }))

  return transformedData
}
