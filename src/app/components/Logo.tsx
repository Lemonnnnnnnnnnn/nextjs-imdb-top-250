interface Props {
    width ?: number | string
    height ?: number | string
    className ?: string 
}

export default function Logo({width , height , className} : Props) {
    return (
      <svg
        x="0"
        y="0"
        width={width || '60'}
        height={height || "60" }
        className={className}
      >
        <svg
          version="1.1"
          id="cube"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="3.9800000190734863 4.210000038146973 551.510009765625 555.2899780273438"
          enableBackground="new 0 0 559.47 563.5"
        >
          <g>
            <path
              fill="#E50012"
              d="M227,471.17c-77.2,0-133.2-35.43-158.27-90.92C38.76,480.33,93.14,559.5,194.86,559.5
  s213.7-79.17,256.62-179.25C386.01,435.74,304.2,471.17,227,471.17z"
            ></path>
            <path
              fill="#8DC21F"
              d="M334.37,92.52c77.2,0,133.2,35.44,158.27,90.92C522.58,83.38,468.23,4.21,366.51,4.21
  c-101.7,0-213.68,79.17-256.6,179.23C175.38,127.96,257.19,92.52,334.37,92.52z"
            ></path>
            <path
              fill="#FFF000"
              d="M92.3,225.31c0-77.19,35.46-133.19,90.94-158.28C83.17,37.09,3.98,91.44,3.98,193.16
  s79.17,213.7,179.26,256.63C127.76,384.3,92.3,302.5,92.3,225.31z"
            ></path>
            <path
              fill="#009FE8"
              d="M467.17,340.27c0,77.2-35.44,133.2-90.92,158.28c100.07,29.94,179.24-24.41,179.24-126.12
  c0-101.73-79.17-213.7-179.24-256.63C431.73,181.29,467.17,263.09,467.17,340.27z"
            ></path>
            <path
              fill="#FBC600"
              d="M397.85,282.47c0,65.57-53.18,118.73-118.72,118.73c-65.59,0-118.76-53.16-118.76-118.73
  c0-65.56,53.16-118.73,118.76-118.73C344.67,163.74,397.85,216.91,397.85,282.47z"
            ></path>
          </g>
        </svg>
      </svg>
    )
  }
  