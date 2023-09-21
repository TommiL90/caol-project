'use client'
import React, { useContext } from 'react'
import { FinancialContext } from '@/contexts/financial-context'
import { PieOverview } from './graphics/pie-overview'

const PieOverviewConsultants = () => {
  const { reportPizza } = useContext(FinancialContext)

  const newArr = reportPizza.filter((r) => r.value !== 0)

  return <PieOverview reportPizza={newArr} />
}

export default PieOverviewConsultants
