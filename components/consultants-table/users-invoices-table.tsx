'use client'
import React, { useContext } from 'react'
import TableRoot from './table-root'
import { UserInvoices } from '@/types/userInvoices'
import TableHeader from './table-header'
import { getMonthNameWithYear } from '@/functions/get-month-name-with-year'
import { TableBody, TableRow, TableCell, TableHead } from '../ui/table'
import { calculateNetValueAndCommissionOfMOnth } from '@/functions/calculate-netvalue-and-commission-month'
import { FinancialContext } from '@/contexts/financial-context'

interface UserInvoicesTableProps {
  user: string
  userInvoices: UserInvoices
}
const UserInvoicesTable = ({ user, userInvoices }: UserInvoicesTableProps) => {
  const { fixedCostfromConsultantData } = useContext(FinancialContext)
  const { netValueMonths, totalCommissionMonths } =
    calculateNetValueAndCommissionOfMOnth(userInvoices)

  const fixedCost = fixedCostfromConsultantData.find(
    (e) => e.co_usuario === user,
  )

  const entries = Object.keys(userInvoices).length
  const fixedCostMonth = (fixedCost?.brut_salario || 0) * entries

  const monthlyProfit = netValueMonths - totalCommissionMonths - fixedCostMonth
  return (
    <TableRoot user={user}>
      <TableHeader />
      <TableBody>
        {Object.entries(userInvoices).map(([month, userData], index) => {
          const profit = userData.totalNetValue - userData.totalCommission
          const { monthName, yearNumeric } = getMonthNameWithYear(month)

          return (
            <TableRow key={index}>
              <TableCell>{`${monthName} de ${yearNumeric}`}</TableCell>
              <TableCell>
                {/* Receita Líquida de usuario */}
                R$ {userData.totalNetValue.toFixed(2)}
              </TableCell>
              {/* Custo Fixo de usuario */}
              <TableCell>R$ {fixedCost?.brut_salario.toFixed(2)}</TableCell>
              {/* Comisao de usuario */}
              <TableCell>R$ {(-userData.totalCommission).toFixed(2)}</TableCell>
              <TableCell className={profit > 0 ? '' : 'text-destructive'}>
                {/* Lucro de usuario */}
                R$ {profit.toFixed(2)}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow>
          <TableHead>SALDO</TableHead>
          <TableHead>R$ {netValueMonths.toFixed(2)}</TableHead>
          <TableHead>R$ {-fixedCostMonth.toFixed(2)}</TableHead>
          <TableHead>R$ {-totalCommissionMonths.toFixed(2)}</TableHead>
          <TableHead
            className={
              monthlyProfit > 0 ? 'text-green-700' : 'text-destructive'
            }
          >
            R$ {monthlyProfit.toFixed(2)}
          </TableHead>
        </TableRow>
      </TableBody>
    </TableRoot>
  )
}

export default UserInvoicesTable
