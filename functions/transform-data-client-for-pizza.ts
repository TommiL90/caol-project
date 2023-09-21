'use server'
/* eslint-disable camelcase */
import { MonthWithClients } from './reorder-invoices-by-month-clients'

interface SumasPizza {
  [co_cliente: number]: number
}

export const calculateSomaPizza = async (
  data: MonthWithClients[],
): Promise<SumasPizza> => {
  const sumasPizza: SumasPizza = {}

  data.forEach((mesData) => {
    mesData.clientes.forEach((cliente) => {
      const { co_cliente, receita_liquida_do_mes } = cliente

      if (sumasPizza[co_cliente]) {
        sumasPizza[co_cliente] += receita_liquida_do_mes
      } else {
        sumasPizza[co_cliente] = receita_liquida_do_mes
      }
    })
  })

  return sumasPizza
}
