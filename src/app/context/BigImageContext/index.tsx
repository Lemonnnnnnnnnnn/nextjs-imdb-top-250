'use client'
import Mask from '@/app/components/Mask'
import clsx from 'clsx'
import Image from 'next/image'
import { useStore, dispatch } from './store'
import toast from 'react-hot-toast'

const BigImageContext = () => {
  const { show, alt, src } = useStore()

  if(show){
    toast.loading("加载中...")
  }

  return (
    <>
      <Mask
        show={show}
        onClick={() => {
          dispatch({ show: false })
          toast.dismiss()
        }}
      />

      <main
        onClick={() => {
          dispatch({ show: false })
        }}
        className={clsx(
          show ? 'scale-100' : 'scale-0',
          `
            scale
            fixed
            left-1/2
            top-1/2
            z-40
            h-4/5
            w-4/5
            -translate-x-1/2
            -translate-y-1/2 
            bg-transparent
            transition
          `
        )}
      >
        <div className="flex h-full w-full justify-center align-middle">
          {src && (
            <Image
              className="max-h-full object-contain"
              src={src || ''}
              alt={alt || 'big image'}
              fill
              onLoadingComplete={() => toast.dismiss()}
            />
          )}
        </div>
      </main>
    </>
  )
}

export const showBigImage = dispatch

export { BigImageContext }
