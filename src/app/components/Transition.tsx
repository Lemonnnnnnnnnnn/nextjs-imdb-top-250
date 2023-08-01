'use client'

import { Fragment, ReactNode, useEffect, useState } from 'react'
import { Transition as HTransition } from '@headlessui/react'
import { DELAY } from '@/app/consts'

interface Props {
  children: ReactNode
  delay?: number
}

const Transition: React.FC<Props> = ({ children, delay = DELAY }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, delay)
  }, [delay])

  return (
    <HTransition
      appear={true}
      show={show}
      enter="transition duration-[.7s]"
      enterFrom="opacity-0 -translate-x-10 translate-y-10"
      enterTo="opacity-1"
    >
      {children}
    </HTransition>
  )
}

export default Transition
