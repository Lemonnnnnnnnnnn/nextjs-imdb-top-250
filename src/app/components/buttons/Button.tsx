import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => any
  disabled?: boolean
  type?: 'submit' | 'reset'
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={clsx(
        `
          flex
          justify-center
          rounded-md
          bg-sky-500
          dark:bg-sky-700
          px-3
          py-2
          text-sm
          font-semibold
          text-white
          dark:text-gray-200
          hover:bg-sky-600
          dark:hover:bg-sky-800
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-sky-600
          `,
        disabled && 'cursor-default opacity-50',
        type === 'reset' &&
          'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:outline-gray-900',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
