import { MonthWithClients } from './reorder-invoices-by-month-clients'

export const getTotalnetValueByClient = async (
  clientId: number,
  data: MonthWithClients[],
) => {
  let total = 0
  data.forEach((mesCliente) => {
    const clientData = mesCliente.clientes.find(
      (c) => c.co_cliente === clientId,
    )
    if (clientData) {
      total += clientData.receita_liquida_do_mes
    }
  })

  return total.toString(2)
}
