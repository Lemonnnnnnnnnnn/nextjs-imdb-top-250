import Header from '../components/Header'
import { LocaleRouterLayout } from '../types'
import { useTranslate } from '../hooks/useTranslate'

export default async function RootLayout({ children, params }: LocaleRouterLayout) {
  const t = await useTranslate(params.locale)

  return (
    <>
      <Header t={t} />
      {children}
    </>
  )
}
