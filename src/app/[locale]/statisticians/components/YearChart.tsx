'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { LocaleType } from '@/app/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DataItem {
  start: number
  end: number
  count: number
}

interface Props {
  data: DataItem[]
}

const YearChart: React.FC<Props & LocaleType> = ({ data: _data, t }) => {
  const title = t.statisticiansByYear

  const options = {
    responsive: true,
    legend: {
      position: 'top' as const,
    },
  }
  const labels = _data.map(({ start, end }) => `${start}-${end}`)

  const data = {
    labels,
    datasets: [
      {
        label: t.relatedMovies,
        data: _data.map((item) => item.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div>
      <div className="text-center text-base lg:text-3xl mb-2">{title}</div>
      <Bar options={options} data={data} />
    </div>
  )
}

export default YearChart
