import './globals.css'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'
import { BigImageContext } from './context/BigImageContext'
import DarkContext from './context/DarkContext'
import { ReactNode } from 'react'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'imdb-top-250',
  description: 'imdb-top-250',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'bg-gray-200 dark:bg-gray-800')}>
        <div id="modal"></div>
        <BigImageContext />
        <ToasterContext />
        <AuthContext>
          <DarkContext>{children}</DarkContext>
        </AuthContext>
      </body>
    </html>
  )
}
