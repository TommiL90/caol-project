'use client'

import { ClientsContext } from '@/contexts/client-context'
import { useContext } from 'react'
import {
  TableHeader,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
} from '../ui/table'
import { MonthWithClients } from '@/functions/reorder-invoices-by-month-clients'
import { MONTHS } from '@/constants/months'

const TabletClients = () => {
  const { allClientForTable, arrOrderesForMonthAndUser, movedUsers } =
    useContext(ClientsContext)

  const getTotalByClient = (clientId: number, data: MonthWithClients[]) => {
    let total = 0
    data.forEach((mesCliente) => {
      const clientData = mesCliente.clientes.find(
        (c) => c.co_cliente === clientId,
      )
      if (clientData) {
        total += clientData.receita_liquida_do_mes
      }
    })
    return total.toFixed(2)
  }

  return (
    <>
      {allClientForTable && arrOrderesForMonthAndUser && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Periodo</TableHead>
              {allClientForTable.map((cliente) => (
                <TableHead key={cliente.co_cliente}>
                  {
                    movedUsers.find((u) => u.co_cliente === cliente.co_cliente)
                      ?.no_fantasia
                  }
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrOrderesForMonthAndUser.map((mesCliente) => (
              <TableRow key={`unique_key_${Math.random()}`}>
                <TableCell>{`${MONTHS[mesCliente.mes]} de ${
                  mesCliente.ano
                }`}</TableCell>
                {allClientForTable.map((cliente) => (
                  <TableCell key={cliente.co_cliente}>
                    R${' '}
                    {mesCliente.clientes
                      .find((c) => c.co_cliente === cliente.co_cliente)
                      ?.receita_liquida_do_mes?.toFixed(2) ?? 0}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell>TOTAL</TableCell>
              {allClientForTable.map((cliente) => (
                <TableCell key={cliente.co_cliente}>
                  R${' '}
                  {getTotalByClient(
                    cliente.co_cliente,
                    arrOrderesForMonthAndUser,
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default TabletClients
