/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { findAllClients } from '@/functions/find-all-clients'
import {
  ClientWithNetRevenue,
  MonthWithClients,
  reorderInvoicesfromMonthsAndClients,
} from '@/functions/reorder-invoices-by-month-clients'
import { Client } from '@/functions/retrieve-clients'
import { RetrieveInvoice } from '@/functions/retrieve-invoices'
import { retrieveInvoicesFromClients } from '@/functions/retrieve-invoices-froms-clients'
import { transformInvoicesToMonthlyFormat } from '@/functions/transform-invoices-to-monthly-format'
import { transformToClientSummaries } from '@/functions/transform-to-client-summaries'
import { UserSummaries } from '@/functions/user-summaries'
import useClients from '@/hooks/useClients'
import { DateRange } from '@/hooks/useDateRange'
import { addDays } from 'date-fns'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface IChildrenProps {
  children: React.ReactNode
}

interface IClientsContext {
  date: DateRange | undefined
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
  availableUsers: Client[]
  selectedUsers: Client[]
  movedUsers: Client[]
  handleMove: (direction: 'left' | 'right') => void
  handleUserClick: (user: Client) => void
  getReport: () => Promise<void>
  allClientForTable: ClientWithNetRevenue[]
  arrOrderesForMonthAndUser: MonthWithClients[]
  reportGraphic: Record<string, any>[]
  reportPizza: UserSummaries[]
  loading: boolean
}

export const ClientsContext = createContext({} as IClientsContext)
export const ClientsProvider = ({ children }: IChildrenProps) => {
  const [allClientForTable, setAllClientsForTable] = useState<
    ClientWithNetRevenue[]
  >([])
  const [arrOrderesForMonthAndUser, setArrOrderedforMonthAndUser] = useState<
    MonthWithClients[]
  >([])
  const [reportGraphic, setReportGraphic] = useState<Record<string, any>[]>([])
  const [reportPizza, setReportPizza] = useState<UserSummaries[]>([])
  const [loading, setLoading] = useState(false)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2007, 0, 1),
    to: addDays(new Date(2007, 1, 20), 30),
  })
  const {
    availableUsers,
    selectedUsers,
    movedUsers,
    handleUserClick,
    handleMove,
  } = useClients()

  const getReport = async () => {
    if (date?.from && date?.to && movedUsers.length > 0) {
      let invoices: RetrieveInvoice[] = []

      try {
        setLoading(true)
        const data = await retrieveInvoicesFromClients(
          movedUsers,
          date.from,
          date.to,
        )
        invoices = data
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }

      const orderInvoicesfromMonthsAndClients =
        await reorderInvoicesfromMonthsAndClients(invoices)

      setArrOrderedforMonthAndUser(orderInvoicesfromMonthsAndClients)

      const allClients = await findAllClients(orderInvoicesfromMonthsAndClients)

      setAllClientsForTable(allClients)

      // grafico

      const dataMonthlyFormatForRecharts =
        await transformInvoicesToMonthlyFormat(
          orderInvoicesfromMonthsAndClients,
        )

      setReportGraphic(dataMonthlyFormatForRecharts)

      const dataForPizzaRechart = await transformToClientSummaries(
        dataMonthlyFormatForRecharts,
      )
      setReportPizza(dataForPizzaRechart)
    } else {
      alert('date or users are undefined')
    }
  }

  return (
    <ClientsContext.Provider
      value={{
        availableUsers,
        selectedUsers,
        movedUsers,
        handleUserClick,
        handleMove,
        date,
        setDate,
        getReport,
        allClientForTable,
        arrOrderesForMonthAndUser,
        reportGraphic,
        reportPizza,
        loading,
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
