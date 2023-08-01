'use client'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Genre } from '@prisma/client'
import { LocaleType } from '@/app/types'

ChartJS.register(ArcElement, Tooltip, Legend)

type DataItem = Genre & {
  _count: {
    imdbItems: number
  }
}

interface Props {
  data: DataItem[]
}

const GenreChart: React.FC<Props & LocaleType> = ({ data: _data, t }) => {
  const title = t.statisticiansByGenre

  const options = {
    responsive: true,
    legend: {
      position: 'top' as const,
    },
  }

  let labels: string[] = []
  if (t.lang === 'en') labels = _data.map((item) => item.value)
  if (t.lang === 'zh') labels = _data.map((item) => item.valueCn)

  const data = {
    labels,
    datasets: [
      {
        label: t.relatedMovies,
        data: _data.map((item) => item._count.imdbItems),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div>
      <div className="mb-2 text-center text-base lg:text-3xl">{title}</div>
      <Pie data={data} options={options} />
    </div>
  )
}

export default GenreChart
