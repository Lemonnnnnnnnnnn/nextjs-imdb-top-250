'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const DarkContext: React.FC<Props> = ({ children }) => {
  return <ThemeProvider attribute='class' defaultTheme='light'>{children}</ThemeProvider>
}

export default DarkContext
