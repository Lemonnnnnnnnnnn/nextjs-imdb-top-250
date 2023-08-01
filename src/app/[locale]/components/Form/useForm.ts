'use client'

import { useState } from 'react'
import { FormTypes } from '@/app/types'

const initFormData : FormTypes = {
  genre: '',
}

let dispatch: (f: FormTypes) => void

const useForm = () => {
  const [state, setState] = useState<FormTypes>(initFormData)

  dispatch = setState

  return {
    state,
  }
}

export { useForm, dispatch }
