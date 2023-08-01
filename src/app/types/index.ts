import type { ImdbItem as ImdbItemRaw } from '@prisma/client'
import { ReactNode } from 'react'
import TranslateJson from '../public/locales/en/translation.json'
export interface LocalDetailRespTypes {
  images: string[]
  plot: string
  genre: string[]
  releaseDetailed: {
    releaseLocation: {
      country: string
      cca2: string
    }
  }
  actors: string[]
}

export type ImdbItemTypes = ImdbItemRaw & { like: boolean }

export interface FormTypes {
  genre ?: string
  country ?: string 
} 

export interface LocaleRouterParams {
  params : {
    locale : string
  },
}

export interface LocaleRouterLayout {
  params : {
    locale : string
  },
  children ?: ReactNode
}

export type LocaleType = {
  t : typeof TranslateJson 
} 