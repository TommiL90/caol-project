'use client'

import { COLORS } from '@/constants/colors'
import { ClientsContext } from '@/contexts/client-context'
import { useContext } from 'react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from 'recharts'

export function LineOverview() {
  const { reportGraphic, userArr } = useContext(ClientsContext)
  if (!reportGraphic) {
    return <div>Loading...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={reportGraphic}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[0, 32000]}
          tickFormatter={(value) => `$${value}`}
        />{' '}
        <Tooltip />
        <Legend />
        {userArr.map((user, index) => (
          <Line
            key={index}
            dataKey={user}
            fill={COLORS[index % COLORS.length]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
