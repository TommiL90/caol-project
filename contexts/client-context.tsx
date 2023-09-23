'use client'

import { calculateSumOfValuesByClientAndMonth } from '@/functions/calculate-sum-of-values-by-client-and-month'
import { createArrUsers } from '@/functions/create-array-users'
import { findAllClients } from '@/functions/find-all-clients'
import {
  ClientWithNetRevenue,
  MonthWithClients,
  reorderInvoicesfromMonthsAndClients,
} from '@/functions/reorder-invoices-by-month-clients'
import { Client } from '@/functions/retrieve-clients'
import { retrieveInvoicesFromClients } from '@/functions/retrieve-invoices-froms-clients'
import { transformDataClientForRecharts } from '@/functions/transform-data-client-for-recharts'
import { transformDataClientForPizzaRecharts } from '@/functions/transform-data-for-pizza-recharts'
import { UserSummaries } from '@/functions/user-summaries'
import useClients from '@/hooks/useClients'
import { DateRange } from '@/hooks/useDateRange'
import { addDays } from 'date-fns'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

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
  userArr: string[]
}

interface IChildrenProps {
  children: React.ReactNode
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
  const [userArr, setUserArr] = useState<string[]>([])

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2007, 0, 1),
    to: undefined,
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
      const invoices = await retrieveInvoicesFromClients(
        movedUsers,
        date.from,
        date.to,
      )

      const orderInvoicesfromMonthsAndClients =
        await reorderInvoicesfromMonthsAndClients(invoices)

      setArrOrderedforMonthAndUser(orderInvoicesfromMonthsAndClients)

      const allClients = await findAllClients(orderInvoicesfromMonthsAndClients)
      setAllClientsForTable(allClients)

      const somaOfValuesByClientsAndMonths =
        await calculateSumOfValuesByClientAndMonth(invoices)

      // grafico
      const transformedDataForRecharts = await transformDataClientForRecharts(
        somaOfValuesByClientsAndMonths,
      )
      console.log(transformedDataForRecharts)
      setReportGraphic(transformedDataForRecharts)

      const clientsFromDataRecharts = await createArrUsers(
        transformedDataForRecharts,
      )
      setUserArr(clientsFromDataRecharts)

      const dataForPizzaRechart = await transformDataClientForPizzaRecharts(
        transformedDataForRecharts,
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
        userArr,
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
