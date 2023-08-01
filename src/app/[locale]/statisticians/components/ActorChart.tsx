'use client'
import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { LocaleType } from '@/app/types'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

type DataItem = {
  _count: {
    movies: number
  }
  name: string
  nameCn: string
}

interface Props {
  data: DataItem[]
}

const ActorChart: React.FC<Props & LocaleType> = ({ data: _data, t }) => {
  const title = t.statisticiansByActor

  const options = {
    responsive: true,
    legend: {
      position: 'top' as const,
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  }

  let labels: string[] = []
  if (t.lang === 'en') labels = _data.map((item) => item.name)
  if (t.lang === 'zh') labels = _data.map((item) => item.nameCn)

  const data = {
    labels,
    datasets: [
      {
        label: t.relatedMovies,
        data: _data.map((item) => item._count.movies),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  }
  return (
    <div>
      <div className="mb-2 text-center text-base lg:text-3xl">{title}</div>
      <Radar data={data} options={options} />
    </div>
  )
}

export default ActorChart
