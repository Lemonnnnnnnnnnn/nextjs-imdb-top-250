import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { throttle } from '../service/utils'
import {DELAY} from '@/app/consts'


export const useIsInViewport = (ref: MutableRefObject<any>) => {
  const [isInView, setIsInView] = useState(false)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    observer.current = new IntersectionObserver(
      throttle(([entity]: IntersectionObserverEntry[]) => {
        setIsInView(entity.isIntersecting)
      }, DELAY)
      // ([entity]) => {
      //   setIsInView(entity.isIntersecting)
      // }
    )
  }, [])

  useEffect(() => {
    observer.current && observer.current.observe(ref.current)

    return () => {
      observer.current && observer.current.disconnect()
    }
  }, [ref, observer])

  return isInView
}
