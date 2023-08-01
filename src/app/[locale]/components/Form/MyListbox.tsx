'use client'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi'
import { BsCheck } from 'react-icons/bs'
import { Control, useController } from 'react-hook-form'
import { FormTypes } from '@/app/types'

export type OptionItem = {
  key: string
  value: string
}

interface Props {
  name: keyof FormTypes
  control: Control<FormTypes, any>
  label: string
  list: OptionItem[]
  required?: boolean
  placeholder?: string
}

export const MyListbox: React.FC<Props> = (props) => {
  const { list, label, placeholder } = props
  const {
    field: { value = '', onChange },
  } = useController(props)

  return (
    <div className="mt-2 flex items-center gap-4">
      <div className="w-16">{label}:</div>
      <div className="w-full">
        <Listbox value={value} onChange={onChange}>
          <div className="relative">
            <Listbox.Button
              className="
                relative 
                w-full 
                cursor-default 
                rounded-lg 
                bg-white 
                dark:bg-zinc-300
                py-2 
                pl-3 
                pr-10 
                text-left 
                shadow-md 
                ring-1
                ring-slate-200
                focus:outline-none 
                focus-visible:border-indigo-500 
                focus-visible:ring-2 
                focus-visible:ring-white 
                focus-visible:ring-opacity-75 
                focus-visible:ring-offset-2 
                focus-visible:ring-offset-sky-300 
                sm:text-sm
            "
            >
              {({ value: key }) => (
                <>
                  {key ? (
                    <span className="block truncate">
                      {list.find((item) => item.key === key)?.value}
                    </span>
                  ) : (
                    <span className="block text-gray-400 dark:text-slate-700">
                      {placeholder || 'please select'}
                    </span>
                  )}
                  <span
                    className="
                    pointer-events-none 
                    absolute 
                    inset-y-0 
                    right-0 
                    flex 
                    items-center pr-2
                "
                  >
                    <HiChevronDown className="h-5 w-5 text-gray-400" />
                  </span>
                </>
              )}
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="
                    absolute 
                    z-10
                    mt-1 
                    max-h-60 
                    w-full 
                    overflow-auto 
                    rounded-md 
                    bg-white 
                    py-1 
                    text-base 
                    shadow-lg 
                    ring-1 
                    ring-black 
                    ring-opacity-5 
                    focus:outline-none 
                    sm:text-sm
                "
              >
                {list.map((item) => (
                  <Listbox.Option
                    key={item.key}
                    value={item.key}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.value}
                        </span>
                        {selected && (
                          <span
                            className="
                                absolute 
                                inset-y-0 
                                left-0 
                                flex 
                                items-center 
                                pl-3 
                                text-sky-600
                            "
                          >
                            <BsCheck className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}
