import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  errors,
  required,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          text-sm
          font-medium
          leading-6
          text-gray-900
          dark:text-slate-200
        "
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          id={id}
          type={type || 'input'}
          {...register(id)}
          required={required}
          className={clsx(
            `
              block
              w-full
              rounded-md
              border-0
              p-1.5
              text-gray-900
              shadow-sm
              ring-1
              ring-inset
              ring-gray-300
              dark:ring-gray-800
              placeholder:text-gray-400
              focus:ring-2
              focus:ring-inset
              focus:ring-sky-400
              dark:focus:ring-gray-500
              focus-visible:outline-none
              sm:text-sm`,
            errors[id] && 'focus:ring-rose-500'
          )}
        />
      </div>
    </div>
  )
}

export default Input
