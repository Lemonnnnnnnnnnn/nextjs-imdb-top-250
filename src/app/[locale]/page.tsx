import List from './components/List'
import BgImage from './components/BgImage'
import SideBar from './components/SideBar'
import { useTranslate } from '../hooks/useTranslate';
import type { LocaleRouterParams } from '../types';
import React from 'react';

// https://github.com/vercel/next.js/issues/42292

export default async function Home({ params }: LocaleRouterParams ) {
  
  const t = await useTranslate(params.locale)

  return (
    <>
      <BgImage />
      <main
        className="
          mx-2
          sm:mx-5
          mt-5
          lg:mx-10
          lg:flex
        "
      >
        {/* @ts-expect-error Server Component */}
        <SideBar t={t} />
        <List t={t} />
      </main>
    </>
  )
}
