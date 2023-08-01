'use client'

import {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from 'react'
import Modal from './Modal'
import { LOGIN_MODAL_TYPE } from '@/app/consts'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import Input from '../inputs/Input'
import Button from '../buttons/Button'
import request from '@/app/service/request'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import AuthSocialButton from '../buttons/AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import type { User } from '@prisma/client'
import { LocaleType } from '@/app/types'

type loginType = keyof typeof LOGIN_MODAL_TYPE

export interface LoginModalRef {
  openModal: (type: loginType) => void
}

interface LoginModalProps {
  t : LocaleType['t']
}

const LoginModal = forwardRef<LoginModalRef, LoginModalProps>(({t}, ref) => {
  const [show, setShow] = useState(false)
  const [type, setType] = useState<loginType>('register')
  const [isLoading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordVerify: '',
    },
  })

  useImperativeHandle(ref, () => ({
    openModal: (type) => {
      setType(type)
      setShow(true)
    },
  }))

  function onCancel() {
    setShow(false)
  }

  const fields = useMemo(() => {
    if (type === 'login') {
      return [
        {
          id: 'email',
          label: t.email,
          type: 'text',
        },
        {
          id: 'password',
          label: t.password,
          type: 'password',
        },
      ]
    } else {
      return [
        {
          id: 'email',
          label: t.email,
          type: 'email',
        },
        {
          id: 'password',
          label: t.password,
          type: 'password',
        },
        {
          id: 'passwordVerify',
          label: t.passwordVerify,
          type: 'password',
        },
      ]
    }
  }, [type])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)

    if (type === 'register') {
      request
        .post<{ error: string } & User>('api/register', data)
        .then((res) => {
          if (res.error) {
            toast.error(res.error)
          }
          // 登录
          return signIn('credentials', { ...data, redirect: false })
        })
        .then(() => {
          window.location.reload()
        })
        .catch((error) => {
          console.log(error)
          toast.error(t.innerError)
        })
        .finally(() => setLoading(false))
    }

    if (type === 'login') {
      signIn('credentials', { ...data, redirect: false })
        .then((res) => {
          if (res?.error) {
            toast.error(t.loginError)
          } else {
            window.location.reload()
          }
        })
        .catch((error) => {
          console.log(error)

          toast.error(JSON.stringify(error))
        })
        .finally(() => setLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setLoading(true)

    signIn(action)
      .then((res) => {
        if (res?.error) {
          toast.error(JSON.stringify(res.error))
        }
      })
      .catch((error) => toast.error(JSON.stringify(error)))
      .finally(() => setLoading(false))
  }

  const toggleOperateType = () => {
    if (type === 'login') {
      setType('register')
    } else if (type === 'register') {
      setType('login')
    }
  }

  return (
    <Modal onCancel={onCancel} show={show}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div className="mt-3" key={field.id}>
            <Input {...field} register={register} errors={errors} required />
          </div>
        ))}
        <div className="mt-6">
          <Button type="submit" className='w-full' disabled={isLoading}>
            {type === 'login' ? t.login : t.register}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div
            className="
              absolute
              inset-0
              flex
              items-center
            "
          >
            <div
              className="
                w-full
                border-t
                border-gray-300
                dark:border-gray-700
              "
            />
          </div>
          <div
            className="
              relative
              flex
              justify-center
              text-sm
            "
          >
            <span
              className="
                bg-white
                dark:bg-slate-600
                px-2 
                text-gray-500
                dark:text-white
              "
            >
              {t.thirdPlatformLogin}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <AuthSocialButton
          Icon={BsGithub}
          onClick={() => socialAction('github')}
        />
        {/* <AuthSocialButton
          Icon={BsGoogle}
          onClick={() => socialAction('google')}
        /> */}
      </div>

      <div
        className="
          mt-6
          flex
          justify-center
          gap-2
          px-2
          text-sm
          text-gray-500
          dark:text-gray-200
        "
      >
        <div>{t.choose}</div>

        <div onClick={toggleOperateType} className="cursor-pointer underline">
          {type === 'login' ? t.register : t.login}
        </div>
      </div>
    </Modal>
  )
})

LoginModal.displayName = 'LoginModal'

export default LoginModal
