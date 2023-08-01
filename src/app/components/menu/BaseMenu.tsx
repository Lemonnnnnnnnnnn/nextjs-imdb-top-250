import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { HiSwitchVertical } from 'react-icons/hi'
import { useContext } from 'react'
import { LocaleContext } from '../Header'

export interface MenuItem {
  key: string
  label: string
  onClick?: (key: string) => any
}

interface Props {
  list: MenuItem[]
  className?: string
}

export const BaseMenu: React.FC<Props> = ({ list, className }) => {
  const { t } = useContext(LocaleContext) || {}
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button
        className={clsx(
          `
          flex
          cursor-pointer
          items-center
          gap-2
          transition
          hover:text-blue-500
          focus:outline-none
          focus-visible:ring-0
        `,
          className
        )}
      >
        <HiSwitchVertical />
        {t ? t['language'] : 'language'}
      </Menu.Button>
      <Menu.Items
        className="
          absolute 
          right-0 
          z-20
          mt-2 
          w-20
          origin-top-right
          divide-y
          overflow-hidden
          rounded-md
          bg-white
          text-sm
          shadow-lg
          ring-1
          ring-black
          ring-opacity-5
          focus:outline-none
        "
      >
        {list.map((item) => (
          <Menu.Item key={item.key}>
            {({ active }) => (
              <a
                className={clsx(
                  `
                  flex
                  cursor-pointer
                  flex-col
                  p-2
                  text-sm
                  text-gray-600
                  transition
                  lg:text-base
                  
                `,
                  active && 'bg-blue-300'
                )}
                onClick={() => {
                  item.onClick && item.onClick(item.key)
                }}
              >
                {item.label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
