'use client'

import {  useEffect, useRef, useState } from 'react'
import Page from './Page'
import { useIsInViewport } from '@/app/hooks/useIsInViewport'
import { useForm } from './Form/useForm'
import { LocaleType } from '@/app/types'
import { createContext } from 'react'

export const LocaleContext = createContext<LocaleType | null>(null)

const List = ({ t }: LocaleType) => {
  const [current, setCurrent] = useState(0)
  const [isOver, setIsOver] = useState(false)
  const { state: formState } = useForm()

  let pages = []

  const bottomRef = useRef(null)

  const isInviewport = useIsInViewport(bottomRef)

  useEffect(() => {
    if (!isOver && isInviewport) {
      setCurrent((current) => current + 1)
    }
  }, [isInviewport, isOver])

  useEffect(() => {
    setCurrent(0)
    setIsOver(false)
  }, [formState])

  for (let i = 0; i < current; i++) {
    pages.push(
      <Page
        params={formState}
        key={i + 1}
        current={i + 1}
        setIsOver={setIsOver}
      />
    )
  }

  return (
    <LocaleContext.Provider value={{ t }}>
      <div
        className="
          flex
          flex-wrap 
          justify-around
          w-full
          gap-x-6
          gap-y-12
        "
      >
        {pages}
        <div className="h-10 w-full" ref={bottomRef} />
      </div>
    </LocaleContext.Provider>
  )
}

export default List
