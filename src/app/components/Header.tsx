'use client'

import { useRef } from 'react'
import LoginModal from './modals/LoginModal'
import type { LoginModalRef } from './modals/LoginModal'
import { LOGIN_MODAL_TYPE } from '../consts'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LngMenu from './menu/LngMenu'
import type { LocaleType } from '../types'
import Logo from '@/app/components/Logo'
import {
  AiFillContainer,
  AiFillSmile,
  AiOutlineLogin,
  AiOutlineLogout,
} from 'react-icons/ai'
import { BiRegistered } from 'react-icons/bi'
import { createContext } from 'react'
import DarkSwitch from './buttons/DarkSwitch'

type loginType = keyof typeof LOGIN_MODAL_TYPE

export const LocaleContext = createContext<LocaleType | null>(null)

const Header = ({ t }: LocaleType) => {
  const loginModalRef = useRef<LoginModalRef>(null)
  const session = useSession()

  const router = useRouter()

  function showModal(type: loginType) {
    loginModalRef.current?.openModal(type)
  }

  const statisticians = (
    <div
      className="
        flex
        h-full
        cursor-pointer
        items-center 
        gap-2
        transition
        hover:text-blue-500
      "
      onClick={() => router.push(`/${t.lang}/statisticians`)}
    >
      <AiFillContainer />
      <span className="hidden lg:block">{t['statisticians']}</span>
    </div>
  )

  const authView = (
    <>
      <div
        className="
          flex
          h-full
          cursor-pointer
          items-center
          gap-2
          transition 
          hover:text-blue-500
        "
        onClick={() => showModal('login')}
      >
        <AiOutlineLogin />
        <span className="hidden lg:block">{t['login']}</span>
      </div>

      <div
        className="
          flex
          h-full
          cursor-pointer 
          items-center
          gap-2
          transition
          hover:text-blue-500
        "
        onClick={() => showModal('register')}
      >
        <BiRegistered />
        <span className="hidden lg:block">{t['register']}</span>
      </div>
    </>
  )

  const mine = (
    <>
      <div
        className="
          flex
          h-full
          cursor-pointer
          items-center
          gap-2
          transition 
          hover:text-blue-500
        "
        onClick={() => router.push(`/${t.lang}/user`)}
      >
        <AiFillSmile />
        <span className="hidden lg:block">{t['mine']}</span>
      </div>
      <div
        className="
          flex
          h-full
          cursor-pointer
          items-center
          gap-2
          transition 
          hover:text-blue-500
        "
        onClick={() => signOut({callbackUrl: '/'})}
      >
        <AiOutlineLogout />
        <span className="hidden lg:block">{t['logout']}</span>
      </div>
    </>
  )

  return (
    <LocaleContext.Provider value={{ t }}>
      <div
        className="
          fixed 
          top-0 
          z-30 
          h-6 
          w-full 
          bg-gray-200 
          dark:bg-slate-800
          lg:h-10
        "
      >
        <div
          className="
          flex
          h-full
          justify-between
          pr-5
          align-middle
          font-serif
          leading-10
        "
        >
          <div className="relative h-full w-8  lg:w-10">
            <span
              className="absolute top-0 h-full w-full cursor-pointer px-2"
              onClick={() => router.replace(`/${t.lang}`)}
            >
              <Logo className="ml-3 h-full w-full" />
            </span>
          </div>

          <div
            className="
              flex 
              items-center
              gap-5 
              align-middle
              text-sm 
              lg:text-lg"
          >
            <DarkSwitch
              className="
                cursor-pointer 
                transition 
              hover:text-blue-500
              "
            />
            <LngMenu className="h-full" />
            {statisticians}
            {session.status === 'unauthenticated' && authView}
            {session.status === 'authenticated' && mine}
          </div>
        </div>
        <LoginModal t={t} ref={loginModalRef} />
      </div>
    </LocaleContext.Provider>
  )
}

export default Header
