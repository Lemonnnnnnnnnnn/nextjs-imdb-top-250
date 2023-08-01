import clsx from 'clsx'

interface BoxProps {
  children: React.ReactNode
  className?: string
}

const Box: React.FC<BoxProps> = ({ children, className = '' }) => {
  return (
    <div
      className={clsx(
        `
        rounded-lg
        border-sky-500
        bg-sky-50
        dark:bg-slate-600
        p-4
        shadow
        transition
        hover:shadow-lg
      `,
        className
      )}
    >
      {children}
    </div>
  )
}

export default Box
