import clsx from 'clsx'

interface RateCircleProps {
  rate: number
  className?: string
}

const SVG_SIZE = 48
const STROKE_WIDTH = 2
const OFFSET = SVG_SIZE / 2
const RADIUS = SVG_SIZE / 2 - STROKE_WIDTH
const WEEK_LENGTH = RADIUS * 2 * Math.PI

const RateCircle: React.FC<RateCircleProps> = ({ rate, className }) => {
  const strokenLength = (rate / 10) * WEEK_LENGTH

  return (
    <div className={clsx('relative', className)}>
      <svg
        className='w-full h-full'
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox="0 0 48 48"
      >
        <circle
          cx={OFFSET}
          cy={OFFSET}
          r={RADIUS}
          strokeDasharray={`${strokenLength} ${WEEK_LENGTH}`}
          fill="#0E1616"
          stroke="#20CD78"
          strokeWidth={STROKE_WIDTH}
        ></circle>
        <text
          x={OFFSET}
          y={OFFSET}
          className="fill-white text-sm"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {rate}
        </text>
      </svg>
    </div>
  )
}

export default RateCircle
