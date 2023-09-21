'use server'
export const getUsersFromDataforRecharts = async (
  dataForRecharts: Record<string, Record<string, number>>,
): Promise<string[]> => {
  const users = new Set<string>()
  for (const date in dataForRecharts) {
    for (const user in dataForRecharts[date]) {
      users.add(user)
    }
  }
  return Array.from(users)
}
