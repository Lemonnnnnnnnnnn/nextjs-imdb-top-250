'use client'

import { useEffect, useState } from 'react'

export interface State {
  src?: string
  show: boolean
  alt?: string
}

let listener: (state: State) => void
const initState: State = {
  src: '',
  show: false,
  alt: 'big image',
}
let memoryState: State = initState

export const dispatch = (state: State) => {
  if (!state.show) {
    memoryState = initState
  } else {
    memoryState = { ...memoryState, ...state }
  }
  listener(memoryState)
}

export const useStore = () => {
  const [state, setState] = useState(memoryState)
  listener = setState

  return {
    ...state,
  }
}
