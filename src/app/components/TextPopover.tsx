import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface Props {
  text?: string
  className?: string
  children: ReactNode
}

const TextPopover: React.FC<Props> = ({ text, className, children }) => {
  return (
    <Popover className="relative">
      <Popover.Button
        className={clsx(
          'w-full truncate focus-visible:outline-none',
          className
        )}
      >
        {children}
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel
          className="
            absolute 
            -left-1/3 
            top-0 
            z-30 
            rounded-lg 
            bg-slate-800/90 
            p-2 
            text-white 
            dark:bg-slate-200/90 
            dark:text-black
          "
        >
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default TextPopover
