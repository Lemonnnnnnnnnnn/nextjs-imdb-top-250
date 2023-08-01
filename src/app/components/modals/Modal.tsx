'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import Mask from '../Mask'
import clsx from 'clsx'

interface ModalProps {
  show?: boolean
  onCancel: () => any
  onOpen?: () => any
  background?: string
  children?: React.ReactNode
}

const Modal = ({ children, onCancel, show, background }: ModalProps) => {
  const [isready, setIsReady] = useState(false)

  // https://github.com/vercel/next.js/discussions/17443
  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isready) return null

  return (
    <>
      {createPortal(
        <div>
          <Mask show={show} onClick={onCancel} />
          <main
            className={clsx(
              show ? 'top-1/2 -translate-y-1/2' : 'top-full',
              background ? `bg-${background}` : 'bg-white dark:bg-slate-600',
              `
                fixed
                left-1/2
                z-50
                min-w-[400px]
                -translate-x-1/2
                rounded-2xl
                p-10
                transition
              `
            )}
          >
            {children}
          </main>
        </div>,
        document.body
        // document.getElementById('modal')!
      )}
    </>
  )
}

export default Modal
