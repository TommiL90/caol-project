'use server'
import { prisma } from '@/lib/prisma'

export const calculateAverageFixedCost = async () => {
  const averageFixedCost = await prisma.cao_salario
    .findMany()
    .then((consultants) => {
      const suma = consultants.reduce(
        (total, consultant) => total + consultant.brut_salario,
        0,
      )
      return suma / consultants.length
    })

  return averageFixedCost
}
