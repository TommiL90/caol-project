'use server'

import { UserSummaries } from './user-summaries'

/* eslint-disable @typescript-eslint/no-explicit-any */

export const transformDataClientForPizzaRecharts = async (
  data: Record<string, number>[],
): Promise<UserSummaries[]> => {
  const result: Record<string, number> = {}

  data.forEach((item) => {
    for (const key in item) {
      if (key !== 'month') {
        result[key] = (result[key] || 0) + item[key]
      }
    }
  })

  const userSummaries: UserSummaries[] = Object.entries(result).map(
    ([name, value]) => ({ name, value }),
  )

  return userSummaries
}
